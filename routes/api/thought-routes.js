const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController.js");

// API routes for all thoughts
router.route("/").get(getThoughts).post(createThought);

// API routes for a single thought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// API route to add a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

// API route to remove a reaction from a thought
router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction);

module.exports = router;
