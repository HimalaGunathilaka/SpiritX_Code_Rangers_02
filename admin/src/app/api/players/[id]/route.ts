import { NextResponse } from 'next/server';
import connectMongo from '@/lib/dbconfig';
import Player from '@/models/player';
import mongoose from 'mongoose';

export async function DELETE(request: Request) {
  try {
    await connectMongo();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }
    return NextResponse.json(player);
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json({ error: 'Failed to delete player' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectMongo();
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    const data = await request.json();
    
    data.totalruns = parseInt(data.totalruns, 10);
    data.ballsfaced = parseInt(data.ballsfaced, 10);
    data.inningsplayed = parseInt(data.inningsplayed, 10);
    data.wickets = parseInt(data.wickets, 10);
    data.overbowled = parseInt(data.overbowled, 10);
    data.runsconceded = parseInt(data.runsconceded, 10);

    const player = await Player.findByIdAndUpdate(id, data, { new: true });
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }
    return NextResponse.json(player);
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json({ error: 'Failed to update player' }, { status: 500 });
  }
}


