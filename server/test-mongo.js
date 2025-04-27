const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin1234@cluster0.qsaqwwg.mongodb.net/kenya-exports?retryWrites=true&w=majority",
    { serverSelectionTimeoutMS: 30000 }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});