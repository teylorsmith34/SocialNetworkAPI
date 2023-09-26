const mongoose = require("mongoose");
const seedData = require("./seedData");

const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/socialNetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Insert seed data into the database
const insertSeedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    // Insert users
    const users = await User.insertMany(seedData.users);

    // Update thoughts with user references
    const thoughtsWithUsers = seedData.thoughts.map((thought, index) => ({
      ...thought,
      username: users[index].username,
    }));
    const thoughts = await Thought.insertMany(thoughtsWithUsers);

    // Update reactions with user references
    const reactionsWithUsers = seedData.reactions.map((reaction, index) => ({
      ...reaction,
      username: users[index].username,
    }));
    await Reaction.insertMany(reactionsWithUsers);

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    mongoose.connection.close();
  }
};

insertSeedData();
