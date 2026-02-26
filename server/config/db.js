const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || "20"),
      minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE || "5"),
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`mongodb connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
