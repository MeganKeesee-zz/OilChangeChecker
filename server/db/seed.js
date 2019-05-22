const db = require('./db.js');
const User = require('./schema');
const  mongoose = require('mongoose');
const faker = require('faker');

const sampleData = () => {
  const Users = [];

  for (let i = 0; i < 50; i++) {
    Users.push({
      user: faker.internet.email(),
      dateOfLastOC: faker.date.past(),
      prevOdometerReading: faker.random.number({min: 5000, max: 100000}),
      suggestedInterval: faker.random.arrayElement([3000, 5000, 7000, 15000]),
    });
  };
  return Users;
};

const insertSampleData = () => {
  User.create(sampleData())
    .then(() => mongoose.connection.close())
    .catch((err) => console.error('something went wrong:' + err));
};

insertSampleData();