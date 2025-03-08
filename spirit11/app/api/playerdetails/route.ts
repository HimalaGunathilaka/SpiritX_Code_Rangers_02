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
        _id: player._id,
        name: player.name,
        university: player.university,
        category: player.category,
        totalRuns: player.totalruns,
        ballsFaced: player.ballsfaced,
        inningsPlayed: player.inningsplayed,
        totalWickets: player.wickets,
        ballsBowled: player.overbowled,
        runsConceded: player.runsconceded,
        available: player.available,
        value: value,
      };
    });

    return new NextResponse(JSON.stringify(playerData), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching available players: " + error.message, {
      status: 500,
    });
  }
};

