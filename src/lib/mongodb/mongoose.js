import mongoose from 'mongoose';

let  initialized = false;

export const connect = async () => {

    mongoose.set('strictQuery', true);
    
    if (initialized) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'topdial-services',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        initialized = true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
}

export default { connect };
