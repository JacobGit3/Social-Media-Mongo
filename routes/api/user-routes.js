const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  addFriendtoUser,
  removeFriendfromUser
} = require('../../controllers/user-controller');
const { create } = require('../../models/User');

// Routes for path /api/users
router 
  .route('/')
  .get(getAllUsers)
  .post(createUser)

// Routes for path /api/users/:id
router 
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(removeUser)

// Routes for path /api/users/:userId/friends/:friendId 
router 
  .route('/:userId/friends/:friendId')
  .post(addFriendtoUser)
  .delete(removeFriendfromUser)

module.exports = router;