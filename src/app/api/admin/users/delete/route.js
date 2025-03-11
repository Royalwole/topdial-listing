import { connect } from '../../../../../lib/mongodb/mongoose';
import User from '../../../../../lib/models/user.model';
import { currentUser } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';

export async function DELETE(req) {
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
