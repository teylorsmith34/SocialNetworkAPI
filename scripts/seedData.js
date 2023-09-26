const seedData = {
  users: [
    {
      username: "user1",
      email: "user1@example.com",
      thoughts: [],
      friends: [],
    },
    {
      username: "user2",
      email: "user2@example.com",
      thoughts: [],
      friends: [],
    },
    {
      username: "user3",
      email: "user3@example.com",
      thoughts: [],
      friends: [],
    },
  ],
  thoughts: [
    {
      thoughtText: "This is thought 1",
      username: "user1",
      reactions: [],
    },
    {
      thoughtText: "Thought 2 here!",
      username: "user2",
      reactions: [],
    },
    {
      thoughtText: "Thought 3 is cool!",
      username: "user3",
      reactions: [],
    },
  ],
  reactions: [
    {
      reactionBody: "I agree!",
      username: "user2",
    },
    {
      reactionBody: "Interesting thought!",
      username: "user3",
    },
  ],
};

module.exports = seedData;
