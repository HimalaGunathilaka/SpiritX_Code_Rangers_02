import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';

export async function POST(req: NextRequest) {
  try {
    const { name, email, username, password, teamname } = await req.json();

    if (!name || !email || !username || !password || !teamname) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    try {
      await connectMongo();
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { message: 'Username already taken' },
        { status: 400 }
      );
    }

    // Check if team name already exists
    const existingTeam = await User.findOne({ teamname });
    if (existingTeam) {
      return NextResponse.json(
        { message: 'Team name already taken' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with default values for team, budget, and points
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      teamname,
      team: [],
      budget: 0,
      points: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
          teamname: user.teamname
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          message: 'Validation error',
          errors: Object.values(error.errors).map((err: any) => err.message)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Error creating user: ' + (error.message || 'Unknown error') },
      { status: 500 }
    );
  }
}