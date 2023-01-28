const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// const activity = cwd.includes('/')
//     ? cwd.split('/')[1]
//     : cwd;

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(routes);

db.once('open', () =>{
    app.listen(PORT, () =>{
        console.log(`Running on port ${PORT}!`)
    });
});
