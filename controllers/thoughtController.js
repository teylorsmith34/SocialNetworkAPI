const { Thought, User } = require("../models");

const thoughtController = {
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate({
        path: "reactions",
        select: "-__v",
      });
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      res.json(newThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json({ message: "Thought updated!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } }
      );
      await thought.remove();
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    }
  },
};

module.exports = thoughtController;
