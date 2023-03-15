const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
     
      type: Date,
      default: Date.now,
  
      get: (date) => moment(date).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  },
);


thoughtSchema
    .virtual("reactionCount")
    .get(function () {
      return this.reactions.length;
    })

const Thought = model("thought", thoughtSchema);

module.exports = Thought;