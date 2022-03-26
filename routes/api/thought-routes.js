const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// Routes for path /api/thoughts
router 
  .route('/')
  .get(getAllThought)
  .post(createThought)

// Routes for paht /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

// Routes for path api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(addReaction)

// Routes for path api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions/:reationId")
  .delete(removeReaction)

module.exports = router;