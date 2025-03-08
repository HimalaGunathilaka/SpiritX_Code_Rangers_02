import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import Player from '@/models/player';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectMongo();
    const players = await Player.find({});
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();
    const data = await request.json();
    data._id = new mongoose.Types.ObjectId();
    data.totalruns = parseInt(data.totalruns, 10);
    data.ballsfaced = parseInt(data.ballsfaced, 10);
    data.inningsplayed = parseInt(data.inningsplayed, 10);
    data.wickets = parseInt(data.wickets, 10);
    data.overbowled = parseInt(data.overbowled, 10);
    data.runsconceded = parseInt(data.runsconceded, 10);

    const player = await Player.create(data);
    console.log('Created player:', player);
    return NextResponse.json(player);
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
  }
}