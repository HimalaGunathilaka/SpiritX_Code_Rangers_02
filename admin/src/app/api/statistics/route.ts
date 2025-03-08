import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connectMongo from "@/lib/dbconfig";
import Player from "@/models/player";

interface IPlayer {
  _id: Types.ObjectId;
  name: string;
  totalruns: number;
  wickets: number;
}

export const GET = async () => {
  try {
    await connectMongo();
    const players = await Player.find() as IPlayer[];
    
    if (!players || players.length === 0) {
      return new NextResponse(
        JSON.stringify({
          overallRuns: 0,
          overallWickets: 0,
          highestRunScorer: { name: 'No players', totalruns: 0, wickets: 0 },
          highestWicketTaker: { name: 'No players', totalruns: 0, wickets: 0 }
        }),
        { status: 200 }
      );
    }

    const statistics = {
      overallRuns: players.reduce((sum: number, player: IPlayer) => sum + (player.totalruns || 0), 0),
      overallWickets: players.reduce((sum: number, player: IPlayer) => sum + (player.wickets || 0), 0),
      highestRunScorer: players.reduce((max: IPlayer, player: IPlayer) => 
        (player.totalruns > max.totalruns) ? player : max
      , players[0]),
      highestWicketTaker: players.reduce((max: IPlayer, player: IPlayer) => 
        (player.wickets > max.wickets) ? player : max
      , players[0])
    };

    return new NextResponse(JSON.stringify(statistics), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      "Error in fetching statistics: " + error.message,
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { playerId, newStats } = body;

    await connectMongo();
    if (!playerId || !newStats) {
      return new NextResponse(
        JSON.stringify({ message: "ID or new stats not found" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(playerId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Player id" }),
        { status: 400 }
      );
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { $set: newStats },
      { new: true }
    );

    if (!updatedPlayer) {
      return new NextResponse(
        JSON.stringify({ message: "Player not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Player stats updated", player: updatedPlayer }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      "Error in updating player stats: " + error.message,
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get("playerId");

    if (!playerId) {
      return new NextResponse(
        JSON.stringify({ message: "ID not found" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(playerId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Player id" }),
        { status: 400 }
      );
    }

    await connectMongo();
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return new NextResponse(
        JSON.stringify({ message: "Player not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Player deleted", player: deletedPlayer }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      "Error in deleting player: " + error.message,
      { status: 500 }
    );
  }
}; 