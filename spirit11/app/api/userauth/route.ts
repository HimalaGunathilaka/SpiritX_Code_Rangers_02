import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";
import Player from "@/models/player";

// POST to check user credentials
export const POST = async (request: Request) => {
  try {
    const { name, password } = await request.json();
    await connectMongo();
    const user = await User.findOne({ name, password });

    if (!user) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in checking user credentials: " + error.message, {
      status: 500,
    });
  }
};