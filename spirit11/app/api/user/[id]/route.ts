import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectMongo from '@/lib/dbconfig';
import User from '@/models/user';

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

    // Find user by ID
    const user = await User.findById(params.id)
      .select('-password') // Exclude password from the response
      .populate('team'); // Populate team data if needed

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

    return new NextResponse(
      JSON.stringify(user),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error', error: error.message }),
      { status: 500 }
    );
  }
} 