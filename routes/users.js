//'use strict';

const express = require('express');
const authUser = require('../auth')

// Construct a router instance.
const router = express.Router();

const { User } = require('../models');


// router.get('/users', (req, res) => {
//   res.send('ello');
// })
router.get('/users', authUser, (req, res) => {
  const user = req.currentUser;
  res.json(200).json(user);
});

// Route that creates a new user.
router.post('/users', async (req,res, next) => {

  const { firstName, lastName, emailAddress, password } = req.body;

  try{
    await User.create({
      firstName,
      lastName,
      emailAddress,
      password
    });

    res.location(`/`);
    res.status(201);
    res.end();

  }catch(err){

    err.message = err.errors.map(val => val.message);
    err.status = 400;
    next(err);
  }
  
})
// router.post('/users', (req, res) => {
//   // Get the user from the request body.
//   const user = req.body;

//   const errors = [];

//   //Validate that we have a `name` value
//   if (!user.name){
//     error.push('Please provide a value for "name"')
//   }

//   // Validate that we have an `email` value.
//   if (!user.email) {
//     errors.push('Please provide a value for "email"');
//   }

//   // If there are any errors...
//   if (errors.length > 0) {
//     // Return the validation errors to the client.
//     res.status(400).json({ errors });
//   } else {

//     // Add the user to the `users` array.
//     users.push(user);

//     // Set the status to 201 Created and end the response.
//     res.status(201).end();
//   }
// });

module.exports = router;