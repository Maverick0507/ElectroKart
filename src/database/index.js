import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectToDb;



