import { connect } from '../../../../../lib/mongodb/mongoose';
import User from '../../../../../lib/models/user.model';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function DELETE(req) {
  try {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await connect();
    const adminUser = await User.findOne({ clerkId: clerkUserId });
    
    if (!adminUser || adminUser.role !== 'admin') {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = await req.json();
    const userToDelete = await User.findById(userId);
    
    if (!userToDelete) {
      return new Response('User not found', { status: 404 });
    }

    // Delete from Clerk
    await clerkClient.users.deleteUser(userToDelete.clerkId);
    
    // Delete from MongoDB
    await User.findByIdAndDelete(userId);

    return new Response('User deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete user', { status: 500 });
  }
}
