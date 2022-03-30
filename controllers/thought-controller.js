const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },

  // GET single thought by _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // POST a new thought (add id to users thoughts aswell)
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id} },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // PUT (update) an existing thought by _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId}, 
      { $set: body}, 
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No Thought found with this id'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE a thought by _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thought: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // POST a reaction to a thought (add it to reactions array)
  // /api/thoughts/:thoughtId/reactions
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // DELETE a reaction by _id
  // /api/thoughts/:thoughtId/reactions
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;