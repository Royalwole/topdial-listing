import User from '../models/user.model';
import mongoose from '../mongodb/mongoose';

export const createdOrUpdateUser = async (
    id,
    first_name,
    last_name,
    image_url,
    email_addresses
) => {
    try {
        await mongoose.connect();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    profilePicture: image_url,
                    email: email_addresses[0].email,
                },
            },
            { upsert: true, new: true }
        );
        return user;
    } catch (error) {
        console.error('Error: Could not create or update user', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await mongoose.connect();
        await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
        console.error('Error: Could not delete user', error);
        throw error;
    }
};
