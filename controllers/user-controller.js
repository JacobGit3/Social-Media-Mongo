const { User, Thought } = require('../models');

const userController = {
  // GET all Users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET single User by _id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // POST a new User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  }, 

  // PUT (update) User by _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE User by _Id (and all associated thoughts)
  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        return(dbUserData);
      })
      .then(dbUserData => {
        Thought.deleteMany({ username: dbUserData.username })
          .then(() => {
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch(err => res.status(400).json(err));
  },

  // POST a new friend to Users friend list
  // /api/users/:userId/friends/:friendId
  addFriendtoUser({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE a friend from Users friend list
  // /api/users/:userId/friends/:friendId
  removeFriendfromUser({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = userController;