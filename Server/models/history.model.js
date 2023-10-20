const mongoose = require('mongoose');

const HistoryBookingSchema = new mongoose.Schema({
  historyId: { type: String, required: true, unique: true },
  email :{ type: String, required: true },
  room: { type: Number, required: true, },
  roomType: { type: String, required: true },
  checkin: { type: Date, default: null },  
  checkout: { type: Date, default: null },
  price:{type: Number, default:null},
  numberOfDays: {type:Number, default:null}
},
{ collection: 'history' }
);

const History = mongoose.model('History', HistoryBookingSchema);
module.exports = History;
