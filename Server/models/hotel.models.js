const mongoose = require('mongoose');

const HotelBooking = new mongoose.Schema({
  room: { type: Number, required: true },
  roomType:{type:String, required: true},
  checkin: { type: String,  },
  checkout: { type: String, },
  rentperday: { type: Number, required: true },
  RoomPhoto: {type: String, required:true},  
  discription: { type: String, required: true },
  isBooked: { type: Boolean, }
},
{ collection: 'rooms' }
);

const Rooms = mongoose.model('Rooms', HotelBooking);
module.exports = Rooms;
