const mongoose = require('mongoose');

const HistoryBookingSchema = new mongoose.Schema({
 
  email :{ type: String},
  roomNumber: { type: Number, required: true, },
  roomType: { type: String, required: true },
  checkInDate: { type: Date, default: null },  
  checkOutDate: { type: Date, default: null },
  price:{type: Number, default:null},
  numberOfDays: {type:Number, default:null},
  
},
{ collection: 'history' }
);

const History = mongoose.model('History', HistoryBookingSchema);
module.exports = History;
