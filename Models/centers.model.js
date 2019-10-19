//Dependencies
const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const { Schema } = mongoose;

// Using the Schema constructor, create a new CenterSchema object
const CenterSchema = new Schema({
  centerName: {
    type: String,
    required: true,
    trim: true,
  },
  hours: {
    type: String,
    trim: true,
  },
  cost: {
    type: Boolean,
  },
  numCourts: {
    type: Number,
  },
  addressLink: {
    type: String,
    trim: true,
  },
},
{
  //This will create createdAt and updatedAt fields
  timestamps: true,
});

// This creates our model from the above schema, using mongoose's model method
const Center = mongoose.model('Center', CenterSchema);

// Export the Center model
module.exports = Center;