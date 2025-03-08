import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";

// GET user budget by user ID
export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('id');

    await connectMongo();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify({ budget: user.budget }), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching user budget: " + error.message, {
      status: 500,
    });
  }
};

// PATCH to update user budget by user ID
export const PATCH = async (request: Request) => {
  try {
    const { userId, budget } = await request.json();
    await connectMongo();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    user.budget = budget;
    await user.save();

    return new NextResponse(JSON.stringify({ budget: user.budget }), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in updating user budget: " + error.message, {
      status: 500,
    });
  }
};