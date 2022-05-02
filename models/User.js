const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  profilePic: {
    type: String,
    default: "defaultimage.jpg",
  },
},{timestamps:true});

module.exports = User = mongoose.model('user',UserSchema);