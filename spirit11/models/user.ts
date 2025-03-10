import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  team: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  }],
  budget: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
  },
  teamname: {
    type: String,
    required: true,
  },
  
}, { timestamps: true, versionKey: false });

export default mongoose.models.User || mongoose.model('User', UserSchema);