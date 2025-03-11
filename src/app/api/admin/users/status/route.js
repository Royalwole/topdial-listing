import { connect } from '../../../../../lib/mongodb/mongoose';
import User from '../../../../../lib/models/user.model';
import { currentUser } from '@clerk/nextjs';

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    await connect();
    const adminUser = await User.findOne({ clerkId: user.id });
    
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
