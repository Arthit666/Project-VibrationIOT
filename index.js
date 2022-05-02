const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs');
const path = require('path');

//app
const app = express();
app.use(express.static(__dirname + '/public'));

//connect database
mongoose.connect(process.env.MONGO_URL).then(
  console.log('Conected DB')
).catch(err =>{
  console.log(err)
})


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'2mb'}));
app.use(cors());

//routes
readdirSync('./routes')
.map((r)=> app.use('/api',require('./routes/' + r)));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



app.listen(process.env.PORT || 5000,()=>{
    console.log('server is running')
});