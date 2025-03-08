import mongoose from 'mongoose';


const PlayerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  totalruns: {
    type: Number,
    required: true,
  },
  ballsfaced: {
    type: Number,
    required: true,
  },
  inningsplayed: {
    type: Number,
    required: true,
  },
  wickets: {
    type: Number,
    required: true,
  },
  overbowled: {
    type: Number,
    required: true,
  },
  runsconceded: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  
}, { timestamps: false, versionKey: false });

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);

