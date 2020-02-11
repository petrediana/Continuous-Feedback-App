const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')

// Handle get request to /feedbacks => response: a json array with all the feedbacks from the database
router.get('/feedbacks', async(req, res, next) => {
    try {
        let feedbacks = await models.Feedback.findAll();
        res.status(200).json(feedbacks);
    } catch (err) {
        next(err);
    }
})

// Handle post request to /feedbacks/add => add a new feedback to the db
router.post('/feedbacks/add', async(req, res, next) => {
    try {
        await models.Feedback.create(req.body);
        res.status(200).json({
            message : 'created!'
        })
        
    } catch (err) {
        next(err);
    }
})

// Handle get request to /feedbacks/:aid => response: json array with feedback for a specific activity
router.get('/feedbacks/:aid', async(req, res, next) => {
    try {
        let feedbacks = await models.Feedback.findAll()
        let specificFeedbacks = []
        
        feedbacks.forEach(fbd => {
            if (fbd.id_activity == req.params.aid) {
                specificFeedbacks.push(fbd)
            }
        })
        
        res.status(200).json(specificFeedbacks)
    } catch (err) {
        next(err)
    }
})

module.exports = router;