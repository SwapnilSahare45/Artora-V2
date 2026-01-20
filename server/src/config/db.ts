import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      maxPoolSize: 15,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      retryReads: true,
    });
    console.log("MongoDB connected with connection pooling");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};
