const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then(dronesFromDB => {
      res.render("drones/list", { drones: dronesFromDB });
    })
    .catch()
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const droneDetails = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  }

  Drone.create(droneDetails)
    .then(droneDetails => {
      res.redirect("/drones");
    })
    .catch(err => {
      console.log("error creating new book in DB", err);
      next();
    })
});

router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  
  Drone.findById(req.params.droneId)
    .then((droneDetails) => {
      //console.log(droneDetails);
      res.render("drones/update-form", droneDetails);
    })
    .catch(err => {
      console.log("Error getting book details from DB...", err);
      next();
    });
  //res.render("drones/update-form")
});

router.post('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const droneId = req.params.droneId;

  const newDetails = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  }

  Drone.findByIdAndUpdate(droneId, newDetails)
    .then(() => {
      res.redirect(`/drones`);
    })
    .catch(err => {
      console.log("Error updating book...", err);
      next();
    });
});

router.post('/drones/:droneId/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  console.log(req.params.droneId);
    Drone.findByIdAndDelete(req.params.droneId)
      .then(() => {
        res.redirect("/drones");
      })
      .catch(err => {
        console.log("Error deleting book...", err);
      });
  
  });


module.exports = router;
