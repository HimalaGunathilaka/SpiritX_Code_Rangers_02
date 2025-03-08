import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/dbconfig";
import User from "@/models/user";
import Player from "@/models/player";
import { calculatePlayerPoints } from "@/lib/utils";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('id');

    await connectMongo();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid User ID", { status: 400 });
    }

    const user = await User.findById(userId).populate('team');

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const playerData = user.team.map((player: any) => {
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
        value: value,
        category: player.category,
        totalruns: player.totalruns,
        ballsfaced: player.ballsfaced,
        inningsplayed: player.inningsplayed,
        wickets: player.wickets,
        overbowled: player.overbowled,
        runsconceded: player.runsconceded,
        available: player.available,
      };
    });

    const userData = {
      _id: user._id,
      name: user.name,
      password: user.password,
      team: playerData,
      budget: user.budget,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      points: user.points,
      teamname: user.teamname,
    };

    return new NextResponse(JSON.stringify(userData), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching user information: " + error.message, {
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

    user.budget = user.budget+budget;
    await user.save();

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in removing team members: " + error.message, {
      status: 500 },
    );
  }
};