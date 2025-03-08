import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";
import Player from "@/models/player";

  // GET all users
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


// POST to create a new user
export const POST = async (request: Request) => {
  try {
    const { name, password, budget } = await request.json();
    await connectMongo();
    const newUser = new User({ name, password, team: [], budget });
    await newUser.save();

    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error: any) {
    return new NextResponse("Error in creating user: " + error.message, {
      status: 500 },
    );
  }
};

// PUT to add multiple team members by user ID
export const PUT = async (request: Request) => {
  try {
    const { userId, playerIds, budget } = await request.json();
    await connectMongo();

    if (!mongoose.Types.ObjectId.isValid(userId) || !Array.isArray(playerIds) || playerIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    for (const playerId of playerIds) {
      const player = await Player.findById(playerId);
      if (!player || !player.available) {
        return new NextResponse(`Player with ID ${playerId} not found or not available`, { status: 404 });
      }
      user.team.push(playerId);
      player.available = false;
      await player.save();
    }

    user.budget = budget;
    await user.save();

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in adding team members: " + error.message, {
      status: 500 },
    );
  }
};

// PATCH to remove multiple team members by user ID
export const PATCH = async (request: Request) => {
  try {
    const { userId, playerIds, budget } = await request.json();
    await connectMongo();

    if (!mongoose.Types.ObjectId.isValid(userId) || !Array.isArray(playerIds) || playerIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    for (const playerId of playerIds) {
      const player = await Player.findById(playerId);
      if (!player) {
        return new NextResponse(`Player with ID ${playerId} not found`, { status: 404 });
      }
      user.team = user.team.filter((id: mongoose.Types.ObjectId) => !id.equals(playerId));
      player.available = true;
      await player.save();
    }

    user.budget = budget;
    await user.save();

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in removing team members: " + error.message, {
      status: 500 },
    );
  }
};