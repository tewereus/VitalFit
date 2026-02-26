// Increase the default maximum number of event listeners
require("events").EventEmitter.defaultMaxListeners = 20;

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const { configureCors } = require("./config/corsConfig");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const {
  basicRateLimiter,
  keyGenerator,
  handler,
  skip,
} = require("./middlewares/rateLimiting");

const adminRouter = require("./routes/users/adminRoutes");
// const sessionRouter = require("./routes/utils/sessionRoutes");
// const settingRouter = require("./routes/other/settingRoutes");
// const dashboardRouter = require("./routes/dashboard/dashboardRoutes");

const PORT = process.env.PORT || 9001;
// const Product = require("./models/product/productModel");

connectDB();

// Initialize system cleanup system
// const { initializeCleanup } = require("./utils/systemCleanup");
// initializeCleanup().catch(console.error);

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(configureCors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  basicRateLimiter({
    keyGenerator: keyGenerator,
    skip: skip,
    handler: handler,
  }),
);

app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/sessions", sessionRouter);
// app.use("/api/v1/setting", settingRouter);
// app.use("/api/v1/dashboard", dashboardRouter);

// const ProductCategory = require("./models/product/productModel");
// const updateProducts = async () => {
//   try {
//     // Update all users to add the new properties field
//     await ProductCategory.updateMany({}, { $set: { status: "active" } }); // Initialize properties as an empty array

//     console.log("All product categories have been updated successfully.");
//   } catch (error) {
//     console.error("Error updating categories:", error);
//   }
// };
// updateProducts();

// Import maintenance mode middleware
// const { checkMaintenanceMode } = require("./controllers/other/settingCtrl");

// Apply maintenance mode check middleware for all routes except admin routes
// app.use(checkMaintenanceMode);

// Add our custom error handlers
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
  console.log(`\n🔄 Received ${signal}, starting graceful shutdown...`);
  //   await sendAlertEmail("downtime", {
  //     signal,
  //     timestamp: new Date().toISOString(),
  //   });

  try {
    console.log("✅ Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  //   sendAlertEmail("crash", {
  //     type: "uncaughtException",
  //     message: error?.message,
  //     stack: error?.stack,
  //     timestamp: new Date().toISOString(),
  //   });
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  //   sendAlertEmail("crash", {
  //     type: "unhandledRejection",
  //     reason: reason?.message || reason,
  //     timestamp: new Date().toISOString(),
  //   });
  gracefulShutdown("unhandledRejection");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});
