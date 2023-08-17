const mongoose = require('mongoose');

const HotelBookingSchema = new mongoose.Schema({
  room: { type: Number, required: true },
  roomType: { type: String, required: true },
  checkin: { type: Date, default: null },  
  checkout: { type: Date, default: null },  
  rentperday: { type: Number, required: true },
  RoomPhoto: { type: String, required: true },
  discription: { type: String, required: true },
  isBooked: { type: Boolean }
},
{ collection: 'rooms' }
);

const Rooms = mongoose.model('Rooms', HotelBookingSchema);
module.exports = Rooms;
