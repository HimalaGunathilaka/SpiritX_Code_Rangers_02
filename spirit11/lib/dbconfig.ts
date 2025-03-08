import mongoose from 'mongoose';

const connectMongo = async () => {
  const mongoUrl = process.env.MONGO_URL;
  // console.log("Connecting to mongo with URL:", mongoUrl);
  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
  }
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to mongo");
    return mongoose.connection.asPromise();
  }
  return mongoose.connect(mongoUrl);
};

export default connectMongo;