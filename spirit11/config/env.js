import { config } from "dotenv";

config({
  // Fix the path to point to the correct .env file location
  path: "../.env",
});

export const { MONGO_URI } = process.env;
