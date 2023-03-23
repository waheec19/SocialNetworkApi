const { Thought, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .populate({ path: "reactions", select: "-__v" })
      .sort({ _id: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "thought with that ID not found" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createThought(req, res) {
    console.log("adding a thought");
    console.log(req.body);
    Thought.create(req.body)
      .then((thought) =>
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "created but user with this id not found!" })
          : res.json({ message: "Thought created!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "thought with this id not found!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : User.deleteMany({ _id: { $in: thought.thoughts } })
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    console.log(req.params.thoughtId, req.params.reactionId);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
};