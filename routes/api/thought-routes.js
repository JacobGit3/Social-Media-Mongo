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
const { post } = require('./user-routes');

// Routes for path /api/thoughts
router 
  .route('/')
  .get(getAllThought)

// Routes for path api/thoughts/:userId
router
  .route('/:userId')
  .post(createThought)

// Routes for path /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

//Routes for path /api/thougths/:thoughtId/:userId
router
  .route('/:thoughtId/:userId')
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