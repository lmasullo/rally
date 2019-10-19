//Dependencies
const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const { Schema } = mongoose;

// Using the Schema constructor, create a new UserSchema object
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  skillLevel: {
    type: Number,
    required: true,
  },
  image: {
    type:String
  },
  email: {
    type:String
  },
  centers: [String]
},
{
  //This will create createdAt and updatedAt fields
  timestamps: true,
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;