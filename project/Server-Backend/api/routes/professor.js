const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')

// Handle get request to /professors => response: a json array with all the professors from the database
router.get('/professors', async(req, res, next) => {
   try {
       let professors = await models.Professor.findAll();
       
       res.status(200).json(professors);
   } catch (err) {
       next(err);
   }
});

// Handle post request to /professors/add => add a new professor to the db
router.post('/professors/add', async(req, res, next) => {
    try {
        let professor = await models.Professor.create(req.body);
        res.status(200).json({
            message : 'created!'
        });
        
    } catch (err) {
        next(err);
    }
});

//Handle get request to /professor-api/professors/:pid
router.get('/professors/:pid', async (req, res, next) => {
    try {
        let professor = await models.Professor.findByPk(req.params.pid);
        if (professor) {
            res.status(200).json(professor);
        } else {
            res.status(404).json({message: 'not found'})
        }


    } catch (err) {
        next(err);
    }
});

// Handle get request to /professor-api/professors/:pid/activities => response: a json array with all the activities that a professor has
router.get('/professors/:pid/activities', async(req, res, next) => {
   try {
       let professor = await models.Professor.findByPk(req.params.pid, {
           include : [models.Activity]
       });
       
       if (professor) {
           res.status(200).json(professor.activities);
           
       } else {
           res.status(404).json({
               message : 'not found!'
           });
       }
   } catch (err) {
       next(err);
   }
});

// Handle post request to /professor-api/professors/:pid/activities/add => create an activity and bond it with a professor (professor identified by id)
router.post('/professors/:pid/activities/add', async(req, res, next) => {
   try {
       let professor = await models.Professor.findByPk(req.params.pid);
       
       if (professor) {
           let activity = req.body;
           activity.professorId = professor.id;
           await models.Activity.create(activity);
           
          res.status(200).json({
              message : 'created!'
          });
       } else {
           res.status(404).json({
                message : 'professor not found'
            });
       }
       
   } catch (err) {
       next(err);
   }
});

module.exports = router;