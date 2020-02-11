const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')

// Handle get request to /activities => response: a json array with all the activities from the database
router.get('/activities', async(req, res, next) => {
   try {
       let activities = await models.Activity.findAll();
       
       res.status(200).json(activities);
   } catch (err) {
       next(err);
   }
});

// Handle post request to /activities/add => add a new activity to the db
router.post('/activities/add', async(req, res, next) => {
    try {
        if (req.body.start_date > req.body.end_date) {
            res.status(400).json({
                message : 'date not valid!'
            })
        } else {
            let activity = await models.Activity.create(req.body);
            res.status(200).json({
                message : 'created!'
            });
        }
    } catch (err) {
        next(err);
    }
});

// Handle get request to /activity-api/:aid => get activity by id
router.get('/activities/:aid', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        if(activity){
            res.status(200).json(activity);
        }
        else{
            res.status(404).json({message : 'not found'})
        }


    } catch (err) {
        next(err);
    }
});

// Handle put request to /activities/:aid => update an existing activity
router.put('/activities/:aid', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            await activity.update(req.body);
            res.status(200).json({
                message : 'accepted - update succesful!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})

// Handle put request to /activities/:aid/update-count-emoji1 => update an existing activity count for emoji1
router.put('/activities/:aid/update-count-emoji1', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1 + 1,
                "count_emoji2" : activity.count_emoji2,
                "count_emoji3" : activity.count_emoji3,
                "count_emoji4" : activity.count_emoji4,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji1!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})

// Handle put request to /activities/:aid/update-count-emoji2 => update an existing activity count for emoji2
router.put('/activities/:aid/update-count-emoji2', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1,
                "count_emoji2" : activity.count_emoji2 + 1,
                "count_emoji3" : activity.count_emoji3,
                "count_emoji4" : activity.count_emoji4,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji2!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})

// Handle put request to /activities/:aid/update-count-emoji3 => update an existing activity count for emoji3
router.put('/activities/:aid/update-count-emoji3', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1,
                "count_emoji2" : activity.count_emoji2,
                "count_emoji3" : activity.count_emoji3 + 1,
                "count_emoji4" : activity.count_emoji4,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji3!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})

// Handle put request to /activities/:aid/update-count-emoji4 => update an existing activity count for emoji4
router.put('/activities/:aid/update-count-emoji4', async(req, res, next) => {
    try {
        let activity = await models.Activity.findByPk(req.params.aid);
        
        if (activity) {
            
            let updated = {
                "id" : activity.id,
                "name" : activity.name,
                "start_date" : activity.start_date,
                "end_date" : activity.end_date,
                "count_emoji1" : activity.count_emoji1,
                "count_emoji2" : activity.count_emoji2,
                "count_emoji3" : activity.count_emoji3,
                "count_emoji4" : activity.count_emoji4 + 1,
                "professorId" : activity.professorId
            }
            
            await activity.update(updated);
            //res.status(200).json(activity)
            res.status(200).json({
                message : 'accepted - updated succesfully count_emoji4!'
            })
        } else {
            
            res.status(400).json({
                message : 'not found :('
            })
        }
        
    } catch (err) {
        next(err);
    }
})

module.exports = router;