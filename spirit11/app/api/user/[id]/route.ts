import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';
import Player from '@/models/player';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Validate user ID
    if (!params.id) {
      return new NextResponse(
        JSON.stringify({ message: 'User ID is required' }),
        { status: 400 }
      );
    }

    console.log('Fetching user with ID:', params.id);

    // Find user by ID
    const user = await User.findById(params.id)
      .select('-password') // Exclude password from the response
      .populate({
        path: 'team',
        model: Player,
        select: 'name university category value totalruns ballsfaced inningsplayed wickets overbowled runsconceded available'
      });

    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }

    // Only allow users to access their own data
    if (user._id.toString() !== session.user.id) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 403 }
      );
    }

    // Transform the response data
    const responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      teamname: user.teamname,
      budget: user.budget || 0,
      points: user.points || 0,
      team: Array.isArray(user.team) ? user.team : [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return new NextResponse(
      JSON.stringify(responseData),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return new NextResponse(
      JSON.stringify({ 
        message: 'Internal server error', 
        error: error.message,
        type: error.name 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 