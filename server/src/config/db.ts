import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected with connection pooling");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};
