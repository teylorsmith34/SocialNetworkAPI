const { connect, connection } = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/socialNetworkDB";

// Connect to MongoDB and handle errors
connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  });

module.exports = connection;
