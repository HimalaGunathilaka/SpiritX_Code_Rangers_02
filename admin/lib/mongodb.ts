import mongoose from 'mongoose';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket_tournament';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    const m = await global.mongoose.promise;
    global.mongoose.conn = m;
    return m;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }
}

export default connectDB; 