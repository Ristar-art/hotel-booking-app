require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.models')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'))

mongoose.connect('mongodb://127.0.0.1:27017/hotel');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY) 

const UserData = require('./models/user.models');
const Rooms = require('./models/hotel.models')


app.post('/api/signup', async (req, res) => {
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordRepeat: req.body.passwordRepeat,
      });
  
      res.json({ status: 'ok' });
    } catch (err) {
      res.json({ status: 'error', error: 'Duplicated email'});
    }
  });

  app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const user = await User.findOne({
        name: name,
        password: password,
      });
  
      if (!user) {
        return res.json({ status: 'error', user: false });
      }
  
      const accessToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET
      );
  
      return res.json({ accessToken: accessToken, user: true });
    } catch (err) {
      return res.json({ status: 'error', user: false });
    }
  });

  app.get('/api/all-rooms', async (req, res) => {
    try {
      const allRooms = await Rooms.find({});
      const roomPicture = allRooms.map(room => ({       
        roomPhoto: room.RoomPhoto
      }));
      res.json({ pictures: roomPicture });
    } catch (error) {
      console.error('Error fetching all rooms:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/api/booked-rooms', async (req, res) => {
    try {
      const bookedRooms = await Rooms.find({ isBooked: true }, 'room rentperday RoomPhoto');
      
      const roomInfo = bookedRooms.map(room => ({ 
        roomNumber: room.room,
        rentPerDay: room.rentperday,
        roomPhoto: room.RoomPhoto 
      }));
      
      res.json({
        message: 'Booked rooms',
        bookedRooms: roomInfo
      });
    } catch (error) {
      console.error('Error fetching booked rooms:', error); 
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/available-rooms', async (req, res) => {
    try {
      const availableRooms = await Rooms.find({ isBooked: false }, 'room rentperday RoomPhoto');
      
      const roomInfo = availableRooms.map(room => ({
        roomNumber: room.room,
        rentPerDay: room.rentperday,
        roomPhoto: room.RoomPhoto 
      }));
      
      res.json({
        message: 'Available rooms',
        availableRooms: roomInfo
      });
    } catch (error) {
      console.error('Error fetching available rooms:', error); 
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.get('/room/:roomNumber', async (req, res) => {

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
    const { roomNumber } = req.params;
  
    try {
      const room = await Rooms.findOne({ room: roomNumber });  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.json({
        roomNumber: room.room,
        roomType: room.roomType,
        description: room.discription,
        roomPhoto: room.RoomPhoto,
        rentPerDay: room.rentperday
      });
    } catch (error) {
      console.error('Error fetching room information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  app.post('/api/rooms', async (req, res) => {
    try {
      const newRoom = req.body;
      const createdRoom = await Rooms.create(newRoom);
      res.status(201).json(createdRoom);
    } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
 
  app.post('/api/update-room-dates/:roomNumber', async (req, res) => {
    const { roomNumber } = req.params;
    const { checkInDate, checkOutDate, isbooked } = req.body;
  
    try {
      const room = await Rooms.findOneAndUpdate(
        { room: roomNumber },
        { checkin: checkInDate, checkout: checkOutDate, isBooked: isbooked }, 
        { new: true } 
      );
      
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
  
      res.json({ message: 'Room dates updated successfully', room });
    } catch (error) {
      console.error('Error updating room dates:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
  

  app.post("/create-checkout-session", authenticateToken, async (req, res) => {
    try {
      console.log("Request items:", req.body.items);
  
      const roomNumbers = req.body.items.map(item => item.price_data.product_data.roomNumber);
      
  
      const roomInfoPromises = roomNumbers.map(async roomNumber => {
        const room = await Rooms.findOne({ room: roomNumber });
        if (!room) {
          throw new Error(`Room with number ${roomNumber} not found.`);
        }
        return {
          priceInCents: room.rentperday * 100,
          roomNumber: room.room,
          roomType: room.roomType,
          roomPhoto: room.RoomPhoto,
        };
      });
  
      const roomInfo = await Promise.all(roomInfoPromises);
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const roomInfoItem = roomInfo.find(info =>
            info.roomNumber === item.price_data.product_data.roomNumber
          );
          if (!roomInfoItem) {
            throw new Error(
              `Room info not found for room number ${item.price_data.product_data.roomNumber}.`
            );
          }  
          return {
            price_data: {
              currency: "zar",
              product_data: {
                name: roomInfoItem.roomType,
                images: [roomInfoItem.roomPhoto],
              },
              unit_amount: roomInfoItem.priceInCents,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
  
      console.log("Session:", session);
  
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  
  app.listen(8000, () => {
    console.log('server started');
  });