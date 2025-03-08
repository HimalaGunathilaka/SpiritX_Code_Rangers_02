import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/dbconfig";
import Player from "@/models/player";

// GET all players
export const GET = async () => {
  try {
    await connectMongo();
    const players = await Player.find();
    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching players: " + error.message, {
      status: 500,
    });
  }
};

// POST a new player
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectMongo();
    const newPlayer = new Player(body);
    await newPlayer.save();
    return new NextResponse(JSON.stringify(newPlayer), { status: 201 });
  } catch (error: any) {
    return new NextResponse("Error in creating player: " + error.message, {
      status: 500,
    });
  }
};

// PATCH an existing player
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { playerId, ...updateData } = body;

    await connectMongo();
    if (!mongoose.Types.ObjectId.isValid(playerId)) {
      return new NextResponse("Invalid Player ID", { status: 400 });
    }

    const updatedPlayer = await Player.findByIdAndUpdate(playerId, updateData, {
      new: true,
    });

    if (!updatedPlayer) {
      return new NextResponse("Player not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedPlayer), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in updating player: " + error.message, {
      status: 500 },
    );
  }
};

// DELETE a player
export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get("playerId");

    if (!playerId) {
      return new NextResponse("Player ID not found", { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(playerId)) {
      return new NextResponse("Invalid Player ID", { status: 400 });
    }

    await connectMongo();
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return new NextResponse("Player not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(deletedPlayer), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in deleting player: " + error.message, {
      status: 500 },
    );
  }
};