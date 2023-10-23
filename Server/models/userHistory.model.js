const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  roomNumber: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  }
},
{ collection: 'userHistory' }
);

const History = mongoose.model('History', historySchema);

module.exports = History;
