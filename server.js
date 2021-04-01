const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
require('dotenv').config();

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(process.env.PORT, (err) => {
    if(err) console.log(err);
    else console.log('App running on port ' + process.env.PORT);
});
