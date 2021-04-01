const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
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
            data.sort((a,b)=>Number(b.taskpriority)-Number(a.taskpriority));
            res.render('index.ejs', { info: data});
        })
        .catch(err => {
            console.log(err);
        })
});

app.post('/addTask', urlencodedParser, (req, res) => {
    db.collection('tasks').insertOne({
        'taskName': req.body.taskName,
        'taskDuration': req.body.taskDuration,
        'taskpriority': req.body.taskPriority,
        'percentComplete': 0
    })
        .then(data => {
            console.log('Task has been inserted successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
})

app.put('/updateComplete', (req, res) => {
    console.log(req.body);
    db.collection('tasks').updateOne({ taskName: req.body.taskName, percentComplete: req.body.percComp },
        {
            $set: {
                percentComplete: req.body.percComp + 25
            }
        },
        {
            sort: { _id: -1 },
            upsert: true
        })
        .then(data => {
            res.json('Done')
        })
        .catch(err => {
            console.log(err);
        })
});

app.delete('/deleteTask', (req, res) => {
    db.collection('tasks').deleteOne({ taskName: req.body.taskName })
        .then(data => {
            res.json('Done');
        })
        .catch(err => {
            console.log(err);
        })
});

app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    else console.log('App running on port ' + process.env.PORT);
});

