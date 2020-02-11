const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const models = require('../models')

// Handle get request => response: a json array with all the students
router.get('/students', async(req, res, next) => {
    try {
        let students = await models.Student.findAll();
        res.status(200).json(students);
        
    } catch (err) {
        next(err);
    }
})

// Handle get request to /students/:sid => response: a json with a student by its id
router.get('/students/:sid', async(req, res, next) => {
    try {
        let student = await models.Student.findByPk(req.params.sid);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(400).json({
                message : 'not found!'
            })
        }
    } catch (err) {
        next(err);
    }
})

// Handle post requests to /students/add => add a student to the database
router.post('/students/add', async(req, res, next) => {
    try {
        let student = await models.Student.create(req.body);
        res.status(200).json({
           message : 'created!',
        });
        
    } catch (err) {
        next(err);
    }
})

// Handle get request to /students/:sid/:aid/feedbacks => response: a json array with all the feedback that a student has on a specific activity
router.get('/students/:sid/:aid/feedbacks', async(req, res, next) => {
    try {
       let student = await models.Student.findByPk(req.params.sid, {
           include : [models.Feedback]
       });
       
       let feedbackOnActivity = [];
       if (student) {
           student.feedbacks.forEach(fdb => {
               if (fdb.id_activity == req.params.aid) {
                   feedbackOnActivity.push(fdb)
               }
           })
           res.status(200).json(feedbackOnActivity)
       } else {
           res.status(404).json({
               message : 'not found!'
           });
       }
   } catch (err) {
       next(err);
   }
})

// Handle get request to /students/:sid/feedbacks => response: a json array with all the feedback that a student has
router.get('/students/:sid/feedbacks', async(req, res, next) => {
   try {
       let student = await models.Student.findByPk(req.params.sid, {
           include : [models.Feedback]
       });
       
       if (student) {
           res.status(200).json(student.feedbacks);
           
       } else {
           res.status(404).json({
               message : 'not found!'
           });
       }
   } catch (err) {
       next(err);
   }
});

// Handle delete request to /students/:id => delete a student by its id
router.delete('/students/:id', async(req, res, next) => {
    try {
       let student = await models.Student.findByPk(req.params.id);
       
       if (student) {
           await student.destroy();
           res.status(200).json({
              message : 'accepted' 
           });
           
       } else {
           res.status(404).json({
               message : 'not found :('
           });
       }
   } catch(err) {
       next(err);
   }
});


module.exports = router

/*
// Handle incoming GET request to /student
router.get('/', async (req, res, next) => {
    try {
        let students = await Student.findAll();
    
        res.status(200).json({
            message: 'Handling GET requests to /student',
            students: students
        });
    } catch(err) {
        next(err);
    }
});

// Handle incoming POST request to /student
router.post('/', async(req, res, next) => {
    try {
        await Student.create(req.body);
        res.status(200).json( {
            message : 'created'
        });
    res.status(200).json({
        message: 'Handling POST requests to /student'
    });
    } catch(err) {
        next(err);
    }
});

// Handle incoming GET request to /studentName
router.get('/:studentName', (req, res, next) => {
    const studName = req.params.studentName;
    res.status(200).json({
        message: `Retrieve data for this student: ${studName}`
    });
});

module.exports = router;*/