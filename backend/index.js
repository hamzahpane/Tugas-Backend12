
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const logger = require('morgan'); 
const path = require('path');
const ProductRout = require('./routes/productRout');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected....'));



app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(ProductRout);


app.listen(5000, () => console.log('Server up and running....'));


