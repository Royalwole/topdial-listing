import { connect } from '../../../../lib/mongodb/mongoose';
import User from '../../../../lib/models/user.model';
import { currentUser } from '@clerk/nextjs';

export async function GET() {
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

    const users = await User.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch users', { status: 500 });
  }
}
