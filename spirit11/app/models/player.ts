import mongoose, { Schema, model, models } from 'mongoose';

const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  university: {
    type: String,
    required: [true, 'University is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket Keeper'],
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
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
  available: {
    type: Boolean,
    default: true,
  },
});

// Check if the model exists, if not create it
const Player = models.Player || model('Player', playerSchema);

export default Player; 