//! Importing Packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const socket = require('socket.io');
const ApiRoutes = require('./routes/api');

//! Initialising App
const app = express();

//! Middleware
app.use(morgan('tiny'));
app.use(helmet());
dotenv.config();

//! Routes
app.use(ApiRoutes);

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
}

//! MongoDB CONNECTION
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
   .then(()=>console.log("Mongo Successful")).catch(()=>{console.log("Mongo Failure")})

   
//! Listening PORT
app.listen(process.env.PORT, () => {
   console.log(`Server running on http://localhost:${process.env.PORT}`);
})


