import mongoose from 'mongoose';

let isConnected = false;
let connectionRetries = 0;
const MAX_RETRIES = 3;

export const connect = async () => {
  if (isConnected) return;

  try {
    mongoose.set('strictQuery', true);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const options = {
      dbName: 'topdial-services',
      autoIndex: process.env.NODE_ENV !== 'production',
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    isConnected = true;
    connectionRetries = 0;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    if (connectionRetries < MAX_RETRIES) {
      connectionRetries++;
      console.log(`Retrying connection... Attempt ${connectionRetries} of ${MAX_RETRIES}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connect();
    } else {
      throw new Error('Failed to connect to MongoDB after maximum retries');
    }
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
    throw error;
  }
};

// Add connection event handlers
mongoose.connection.on('error', err => {
  console.error('MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  isConnected = false;
});

process.on('SIGINT', async () => {
  await disconnect();
  process.exit(0);
});

export default { connect, disconnect };
