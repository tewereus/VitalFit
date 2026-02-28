const cors = require("cors");

const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5115"];

      if (!origin || allowedOrigins.indexOf(origin) != -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept-Version",
      "X-User-Type",
      "X-App-Type",
      "X-Security-Password",
      "X-Security-Verified-Timestamp",
    ],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, // enable support for cookies
    preflightContinue: false, // default
    maxAge: 600, // cache pre flight response for 10 mins (600 sec) -> helps avoid sending options requests multiple times
    optionsSuccessStatus: 204, // default
  });
};

module.exports = { configureCors };
