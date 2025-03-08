import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
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
    default: 0,
  },
  ballsfaced: {
    type: Number,
    default: 0,
  },
  inningsplayed: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  overbowled: {
    type: Number,
    default: 0,
  },
  runsconceded: {
    type: Number,
    default: 0,
  },
  embedding: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema); 