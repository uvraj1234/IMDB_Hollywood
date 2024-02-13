// utils/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/imdb_website_data';

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as Parameters<typeof mongoose.connect>[1];

    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB Connected');

    // Attach event listeners after the connection is established
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Instead of exiting the process, throw an error
    throw new Error('Unable to connect to MongoDB');
  }
};

export default connectDB;
