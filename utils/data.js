const email = [
    '1@xjeffcom',
    '2@xjeffcom',
    '3@xjeffcom',
    '4@xjeffcom',
    '5@xjeffcom',
    '6@xjeffcom',
    '7@xjeffcom',
    '8@xjeffcom',
    '9@xjeffcom',
    '10@jeff.com',
    '11@jeff.com',
    '12@jeff.com',
    '13@jeff.com',
    '14@jeff.com',
    '15@jeff.com',
    '16@jeff.com',
    '17@jeff.com',
    ``,
];
  
  const descriptionsBodies = [
    'agree with people',
    'android 16 review',
    'do-it-yourself videos',
    'video on the history of gaming',
    'How to make money',
    'Learn NextJS',
    'Marvel trailer',
    'Hello world',
    'Another solution',
    'Apology vid',
    'Subsnstuff',
  ];
  
  const possibleResponses = [
    'I disagree!',
    'This was awesome',
  ];
  
  const users = [
  'andrew',
  'james',
  'john',
  'phil',
  'bart',
  'matt',
  'tom',
  'simon',
  'james',
  'jude',
  ];
  

  const getRandArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const getRandName = () =>
    `${getRandArrItem(users)}`;

  const getRandEmail = () =>
    `${getRandomArrItem(email)}`;

  
  const getRandThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandArrItem(descriptionsBodies),
        username: getRandName(),
        reactions: [...getThoughtResponses(3)],
      });
    }
    return results;
  };
  
  const getThoughtResponses = (int) => {
    if (int === 1) {
      return getRandomArrItem(possibleResponses);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandArrItem(possibleResponses),
        username: getRandName(),
      });
    }
    return results;
  };
  
  module.exports = { getRandName, getRandEmail, getRandThoughts };np