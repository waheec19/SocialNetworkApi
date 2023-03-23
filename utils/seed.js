const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandName, getRandEmail, getRandThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteAll({});
  await User.deleteAll({});

  const users = [];
  const thoughts = getRandThoughts(10);

  for (let i = 0; i < 20; i++) {
    const username = getRandName();
    const email = getRandEmail();

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});