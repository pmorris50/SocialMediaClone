const { CountryCodes } = require('validator/lib/isISO31661Alpha2');
const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {getRandomUserName, getRandomEmail} = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log("🚀 ~ file: seed.js:9 ~ connection.once ~ connection", connection)
    


await User.deleteMany({});
await Thought.deleteMany({});

const users = [];

for (let i = 0; i < 20; i++){
    const username = getRandomUserName();
    const email = getRandomEmail();

    users.push({
        username, 
        email
    })

}

const newUsers = await User.insertMany(users);


console.table(users);
console.info('Seeding Complete!');
process.exit(0);
})