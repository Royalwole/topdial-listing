import { connect } from '../../../../../lib/mongodb/mongoose';
import User from '../../../../../lib/models/user.model';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId) {
      return new Response('Unauthorized', { status: 401 });
    }
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    await connect();
    const adminUser = await User.findOne({ clerkId: clerkUserId });
    
    if (!adminUser || adminUser.role !== 'admin') {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId, status } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response('Failed to update user status', { status: 500 });
  }
}
