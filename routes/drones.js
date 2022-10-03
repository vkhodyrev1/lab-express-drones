const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here


router.get("/drones", (req, res, next) => {
  Drone.find()
    .then( dronesFromDB => {
        res.render("drones/list", {drones: dronesFromDB})
    })
    .catch( err => {
      console.log("error getting drones from DB", err);
      next();
    })
});

router.get('/drones/create', (req, res, next) => {

  res.render("drones/create-form");
  
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const droneData = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  }
  console.log(droneData);
  Drone.create(droneData)
  .then(createdDrone => {
    res.send("you created a new drone")
  })
  .catch( err => {
    console.log("error getting drones from DB", err);
    next();
  } )

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
