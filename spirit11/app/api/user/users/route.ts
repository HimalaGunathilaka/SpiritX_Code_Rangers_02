// GET all users
import { NextResponse } from "next/server";
import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";

export const GET = async () => {
    try {
      await connectMongo();
      const users = await User.find();
      return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error: any) {
      return new NextResponse("Error in fetching players: " + error.message, {
        status: 500,
      });
    }
  };