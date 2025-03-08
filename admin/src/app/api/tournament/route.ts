import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connectMongo from "@/lib/dbconfig";
import Player from "@/models/player";
import User from "@/models/user";

interface IPlayer {
  _id: Types.ObjectId;
  name: string;
  university: string;
  category: string;
  totalruns: number;
  ballsfaced: number;
  inningsplayed: number;
  wickets: number;
  overbowled: number;
  runsconceded: number;
  available: boolean;
}

interface IUser {
  _id: Types.ObjectId;
  name: string;
  team: string[];
  budget: number;
  points: number;
}

export const GET = async () => {
  try {
    await connectMongo();
    
    // Fetch all players and users
    const players = await Player.find() as IPlayer[];
    const users = await User.find() as IUser[];

    // Calculate tournament statistics
    const tournamentStats = {
      // Overall Statistics
      totalPlayers: players.length,
      totalTeams: users.length,
      totalBudget: users.reduce((sum, user) => sum + user.budget, 0),
      totalPoints: users.reduce((sum, user) => sum + user.points, 0),

      // Batting Statistics
      totalRuns: players.reduce((sum, player) => sum + player.totalruns, 0),
      totalInnings: players.reduce((sum, player) => sum + player.inningsplayed, 0),
      averageRunsPerInnings: players.reduce((sum, player) => sum + player.totalruns, 0) / 
                            players.reduce((sum, player) => sum + player.inningsplayed, 1),
      
      // Bowling Statistics
      totalWickets: players.reduce((sum, player) => sum + player.wickets, 0),
      totalOvers: players.reduce((sum, player) => sum + player.overbowled, 0),
      totalRunsConceded: players.reduce((sum, player) => sum + player.runsconceded, 0),
      averageRunsPerOver: players.reduce((sum, player) => sum + player.runsconceded, 0) / 
                         players.reduce((sum, player) => sum + player.overbowled, 1),

      // Top Performers
      topBatsmen: players
        .sort((a, b) => b.totalruns - a.totalruns)
        .slice(0, 5)
        .map(player => ({
          name: player.name,
          runs: player.totalruns,
          innings: player.inningsplayed,
          average: player.totalruns / player.inningsplayed
        })),

      topBowlers: players
        .filter(player => player.wickets > 0)
        .sort((a, b) => b.wickets - a.wickets)
        .slice(0, 5)
        .map(player => ({
          name: player.name,
          wickets: player.wickets,
          overs: player.overbowled,
          economy: player.runsconceded / player.overbowled
        })),

      // Team Statistics
      teamStats: users.map(user => ({
        name: user.name,
        budget: user.budget,
        points: user.points,
        players: user.team.length
      }))
    };

    return new NextResponse(JSON.stringify(tournamentStats), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      "Error in fetching tournament statistics: " + error.message,
      { status: 500 }
    );
  }
}; 