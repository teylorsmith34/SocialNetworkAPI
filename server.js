const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const connection = require("./config/connection"); // Import the connection object

// Check if the MongoDB connection is ready
connection.once("open", () => {
  console.log("MongoDB connection is ready");

  // Start your Express server here
  app.use(require("./routes"));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Handle MongoDB connection errors
connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
