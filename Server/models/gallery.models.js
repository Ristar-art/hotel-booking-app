const mongoose = require('mongoose');

const HotelGallery = new mongoose.Schema({
  gallery: {type: String},  
},
{ collection: 'galley' }
);

const model = mongoose.model('hotelGallery', HotelGallery);
module.exports = model;
