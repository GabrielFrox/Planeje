const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    objective: String,
    course: String,
    cutscore: Number,
    language: String,
    schedule: {
      monday: Array,
      tuesday: Array,
      wednesday: Array,
      thursday: Array,
      friday: Array,
      saturday: Array,
      Sunday: Array
    }
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
