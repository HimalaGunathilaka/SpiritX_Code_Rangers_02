import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  teamname: {
    type: String,
    required: [true, 'Team name is required'],
    unique: true,
  },
  budget: {
    type: Number,
    default: 21581529.43,
  },
  points: {
    type: Number,
    default: 0,
  },
  team: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Player',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 