import mongoose from 'mongoose';

let isConnected = false;

export const connect = async () => {
  if (isConnected) return;

  try {
    mongoose.set('strictQuery', true);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const options = {
      dbName: 'topdial-services',
      autoIndex: true,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority'
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Retry connection after 5 seconds
    setTimeout(() => connect(), 5000);
  }
};

export const disconnect = async () => {
  if (!isConnected) return;
  
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};

export default { connect, disconnect };
