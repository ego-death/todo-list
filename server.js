const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
require('dotenv').config();
let db, dbName = 'todo';
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

MongoClient.connect(process.env.DB_STRING, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    });

app.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
    .then(data => {
        res.render('index.ejs', {info: data});
    })
    .catch(err => {
        console.log(err);
    })
})

app.post('/addTask', urlencodedParser, (req, res) => {
    db.collection('tasks').insertOne(req.body)
    .then(data => {
        console.log('Task has been inserted successfully');
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
})

app.listen(process.env.PORT, (err) => {
    if(err) console.log(err);
    else console.log('App running on port ' + process.env.PORT);
});

