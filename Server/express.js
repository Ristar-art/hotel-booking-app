require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.models");
const morgan = require("morgan");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const jwt = require('jsonwebtoken')
// mongoose.connect(process.env.MONGODB_URI,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
mongoose.connect('mongodb://127.0.0.1:27017/hotel')
//mongoose.connect("mongodb://127.0.0.1:27017/hotel");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const UserData = require('./models/user.models');
const Rooms = require("./models/hotel.models");
//const History = require('./models/history.model');
const userHistory = require('./models/userHistory.model');
app.post("/api/signup", async (req, res) => {
  try {
    await User.create({
     
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordRepeat: req.body.passwordRepeat,
    });

    res.json({ status: "ok" });
  } catch (err) {
    if (err.code === 11000) {
      res.json({ status: "error", error: "Email already exists" });
    } else {
      res.json({ status: "error", error: "An error occurred" });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
      password: password,
    });

    if (!user) {
      return res.json({ status: "error", user: false });
    }
    
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken)
    return res.json({ accessToken: accessToken, user: true });
    
  } catch (err) {
    return res.json({ status: 'error', user: false });
  }
});

app.get("/api/all-rooms", async (req, res) => {
  console.log("The /api/all-rooms API is called");
  try {
    const allRooms = await Rooms.find({});

    // Check if there are rooms to return
    if (!allRooms || allRooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    const roomPicture = allRooms.map((room) => ({
      roomPhoto: room.RoomPhoto,
    }));

    res.json({ pictures: roomPicture });
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/booked-rooms", async (req, res) => {
  try {
    const bookedRooms = await Rooms.find(
      { isBooked: true },
      "room price RoomPhoto"
    );

    const roomInfo = bookedRooms.map((room) => ({
      roomNumber: room.room,
      price: room.price,
      roomPhoto: room.RoomPhoto,
    }));

    res.json({
      message: "Booked rooms",
      bookedRooms: roomInfo,
    });
  } catch (error) {
    console.error("Error fetching booked rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/available-rooms",authenticateToken, async (req, res) => {
  console.log("the available room api is beig called");
  try {
    const availableRooms = await Rooms.find(
      { isBooked: false },
      "room rentperday RoomPhoto"
    );
    console.log("availableRooms: is ", availableRooms);
    const roomInfo = availableRooms.map((room) => ({
      roomNumber: room.room,
      rentPerDay: room.rentperday,
      roomPhoto: room.RoomPhoto,
    }));
    console.log("roomInfo is: ", roomInfo);
    res.json({
      message: "Available rooms",
      availableRooms: roomInfo,
    });
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/room/:roomNumber",authenticateToken, async (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  console.log("this is being called");
  const { roomNumber } = req.params;

  try {
    const room = await Rooms.findOne({ room: roomNumber });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({
      roomNumber: room.room,
      roomType: room.roomType,
      description: room.discription,
      roomPhoto: room.RoomPhoto,
      rentPerDay: room.rentperday,
      checkin: room.checkin,
      checkout:room.checkout,
      price:room.price,
      numberOfDays:room.numberOfDays,
    });
  } catch (error) {
    console.error("Error fetching room information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/rooms", async (req, res) => {
  try {
    const newRoom = req.body;
    console.log(newRoom); // Make sure the newRoom object is being received properly
    const createdRoom = await Rooms.create(newRoom);
    return res.status(201).json(createdRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    if (error.code === 403) {
      return res.status(403).send("Not authorized");
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }  
});

app.put("/api/update-room-dates/:roomNumber",authenticateToken, async (req, res) => {
  const { roomNumber } = req.params;
  const { checkInDate, checkOutDate, isbooked, totalPrice, numberOfDays } =
    req.body;
  console.log("totalPice is: ", totalPrice);

  try {
    const totalPriceParsed = parseFloat(totalPrice); // Parse the totalPrice to a float

    const room = await Rooms.findOneAndUpdate(
      { room: roomNumber },
      {
        checkin: checkInDate,
        checkout:checkOutDate,
        isBooked: isbooked,
        price: totalPriceParsed, // Use the parsed value here
        numberOfDays: numberOfDays, 
      },
      { new: true }
    );
    console.log("room.price is: ", room.price);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room dates updated successfully", room });
  } catch (error) {
    console.error("Error updating room dates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});  

// Assuming you have a User model and appropriate middleware set up

app.get("/api/user-profile", authenticateToken, async (req, res) => {
  try {
    // You can access the user's email from the token payload provided by the authenticateToken middleware
    const userEmail = req.user.email;
     console.log(userEmail)
    // Assuming your user schema has fields like uid, name, and email
    const userProfile = await User.findOne({ email: userEmail });

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/user-profiles/:id",authenticateToken, async (req, res) => {
  try {
    const userProfile = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!userProfile) {
      return res.status(404).send();
    }

    res.send(userProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(400).send(error.message);
  }
});

app.get("/api/userHistory", authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming the email is available in the req.user object
     
     console.log('userEmail is: ',userEmail)
    // Use the userHistory model to find history records by email
    const history = await userHistory.find({ email: userEmail });
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
app.post("/api/createHistory", async (req, res) => {
  console.log('This API is being called');
  try {
    const { roomNumber, roomType, checkInDate, checkOutDate, price, numberOfDays, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await userHistory.create({
      email,
      roomNumber: roomNumber,
      roomType: roomType,
      checkInDate: moment(checkInDate).format('YYYY-MM-DD'),
      checkOutDate: moment(checkOutDate).format('YYYY-MM-DD'),
      price: price,
      numberOfDays: numberOfDays
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({ status: "error", error: "An error occurred" });
  }
});



app.post("/api/create-checkout-session",authenticateToken, async (req, res) => {
  try {
    const roomNumbers = req.body.items.map(
      (item) => item.price_data.product_data.roomNumber
    );

    const roomInfoPromises = roomNumbers.map(async (roomNumber) => {
      const room = await Rooms.findOne({ room: roomNumber });
      if (!room) {
        throw new Error(`Room with number ${roomNumber} not found.`);
      }
      console.log("room.price is: ", room.price);
      console.log("price is :", room.price * 100);

      return {
        priceInCents: room.price * 100,
        roomNumber: room.room,
        roomType: room.roomType,
      };
    });

    const roomInfo = await Promise.all(roomInfoPromises);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const roomInfoItem = roomInfo.find(
          (info) => info.roomNumber === item.price_data.product_data.roomNumber
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
            },
            unit_amount: roomInfoItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

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


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
