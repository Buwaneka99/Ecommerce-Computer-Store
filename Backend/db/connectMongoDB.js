import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully ${mongo.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed: ", error);
  }
};

export default connectMongoDB;