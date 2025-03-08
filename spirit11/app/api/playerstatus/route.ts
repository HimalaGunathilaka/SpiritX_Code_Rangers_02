import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/dbconfig";
import Player from "@/models/player";
import { calculatePlayerPoints } from "@/lib/utils";

// GET all available players
export const GET = async () => {
  try {
    await connectMongo();
    const players = await Player.find({ available: true });

    const playerData = players.map((player: any) => {
      const stats = {
        totalRuns: player.totalruns,
        ballsFaced: player.ballsfaced,
        inningsPlayed: player.inningsplayed,
        totalWickets: player.wickets,
        ballsBowled: player.overbowled,
        runsConceded: player.runsconceded,
      };
      const value = calculatePlayerPoints(stats).toFixed(2);
      return {
        name: player.name,
        university: player.university,
        value: value,
        category: player.category,
      };
    });

    return new NextResponse(JSON.stringify(playerData), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching available players: " + error.message, {
      status: 500,
    });
  }
};

// PATCH to set availability of a player by _id
export const PATCH = async (request: Request) => {
  try {
    const bodyText = await request.text();
    // console.log("Raw Request Body:", bodyText); // Log the raw request body
    const body = JSON.parse(bodyText);
    console.log("Parsed Request Body:", body); // Log the parsed request body

    const { _id, available } = body;

    await connectMongo();
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return new NextResponse("Invalid Player ID", { status: 400 });
    }

    const updatedPlayer = await Player.findByIdAndUpdate(_id, { available }, { new: true });

    if (!updatedPlayer) {
      return new NextResponse("Player not found", { status: 404 });
    }

    return new NextResponse("", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in updating player availability: " + error.message, {
      status: 500 },
    );
  }
};