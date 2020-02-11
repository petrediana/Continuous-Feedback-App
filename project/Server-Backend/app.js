const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // allows me to correctly parse JSON objects
const morgan = require('morgan'); // a middle-ware that stores the requests
const Sequelize = require('sequelize');
const routes = require('./api/routes')
const models = require('./api/models')

//console.warn(routes)
//models.Feedback.sync({force : true})

let sequelize = new Sequelize('project_db', 'diana', 'pass', {
    dialect: 'mysql'
});


// we can now see in the console which requests were sent
app.use(morgan('dev'));


// suport simple body for url encoding
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//const adminRouter = require("./api/routes/admin")(sequelize)


// implement CORS errors handle
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Content-Type, Accept, Origin, X-Requested-With, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE');
    }
    next();
}) 

// Routes that should handle requests
app.use('/student-api', routes.student)
app.use('/professor-api', routes.professor)
app.use('/activity-api', routes.activity)
app.use('/group-api', routes.group)

app.use('/feedback-api', routes.feedback)

//app.use('/admin-api', adminRouter)

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error); // it will forward this error request
});

// Handle all sorts of errors that are thrown
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;













/*
const studentRoutes = require('./api/routes/student')
const professorRoutes = require('./api/routes/professor')
const activityRoutes = require("./api/routes/activity")
const groupRoutes = require("./api/routes/group")

// load Students table from the models
const studModel = require('./api/models/student')(sequelize, Sequelize);

// load Groups table from the models
const groupModel = require('./api/models/group')(sequelize, Sequelize);

// tell the database that a Group has more Students
groupModel.hasMany(studModel);

// load Professors table from models
const professorModel = require('./api/models/professor')(sequelize, Sequelize);

// load Activities table from models
const activityModel = require('./api/models/activity')(sequelize, Sequelize);

// tell the database that a Professor has more Activities
professorModel.hasMany(activityModel);

*/



//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
/*
// STUDENT ROUTER
// Handle get request => response: a json array with all the students
app.get('/student-api/students', async(req, res, next) => {
    try {
        let students = await studModel.findAll();
        res.status(200).json(students);
        
    } catch (err) {
        next(err);
    }
})

// Handle post requests to /students/add => add a student to the database
app.post('/student-api/students/add', async(req, res, next) => {
    try {
        let student = await studModel.create(req.body);
        res.status(200).json({
           message : 'created!',
        });
        
    } catch (err) {
        next(err);
    }
})

// Handle delete request to /students/:id => delete a student by its id
app.delete('/student-api/students/:id', async(req, res, next) => {
    try {
       let student = await studModel.findByPk(req.params.id);
       
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
});*/


//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//

// GROUP ROUTER
/*
// Handle get request to /groups => response: a json array with all the groups
app.get('/group-api/groups', async(req, res, next) => {
   try {
       let groups = await groupModel.findAll();
       res.status(200).json(groups);
       
   } catch (err) {
       next(err);
   }
});

// Handle post request to /groups/add => using a json body add a group to the db
app.post('/group-api/groups/add', async(req, res, next) => {
    try {
        let group = await groupModel.create(req.body);
        res.status(200).json({
            message : 'created!'
        });
        
    } catch (err) {
        next(err);
    }
});

// Handle get request to /group-api/groups/:gid/students => response: a json array with all the students that that are in a specific group
app.get('/group-api/groups/:gid/students', async(req, res, next) => {
   try {
       let group = await groupModel.findByPk(req.params.gid, {
           include : [studModel]
       });
       
       if (group) {
           res.status(200).json(group.students);
           
       } else {
           res.status(404).json({
               message : 'not found!'
           });
       }
   } catch (err) {
       next(err);
   }
});

// Handle post request to /group-api/groups/:gid/student/add => create a student and bond it with a group (group identified by id)
app.post('/group-api/groups/:gid/student/add', async(req, res, next) => {
   try {
       let group = await groupModel.findByPk(req.params.gid);
       
       if (group) {
           let student = req.body;
           student.groupId = group.id;
           await studModel.create(student);
           
          res.status(200).json({
              message : 'created!'
          });
       } else {
           res.status(404).json({
                message : 'not found'
            });
       }
       
   } catch (err) {
       next(err);
   }
}); */

//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//

/*
// PROFESSOR ROUTER
// Handle get request to /professors => response: a json array with all the professors from the database
app.get('/professor-api/professors', async(req, res, next) => {
   try {
       let professors = await professorModel.findAll();
       
       res.status(200).json(professors);
   } catch (err) {
       next(err);
   }
});

// Handle post request to /professors/add => add a new professor to the db
app.post('/professor-api/professors/add', async(req, res, next) => {
    try {
        let professor = await professorModel.create(req.body);
        res.status(200).json({
            message : 'created!'
        });
        
    } catch (err) {
        next(err);
    }
});

// Handle get request to /professor-api/professors/:pid/activites => response: a json array with all the activities that a professor has
app.get('/professor-api/professors/:pid/activites', async(req, res, next) => {
   try {
       let professor = await professorModel.findByPk(req.params.gid, {
           include : [activityModel]
       });
       
       if (professor) {
           res.status(200).json(professor.activites);
           
       } else {
           res.status(404).json({
               message : 'not found!'
           });
       }
   } catch (err) {
       next(err);
   }
});

// Handle post request to /professor-api/professors/:pid/activites/add => create an activity and bond it with a professor (professor identified by id)
app.post('/professor-api/professors/:pid/activites/add', async(req, res, next) => {
   try {
       let professor = await professorModel.findByPk(req.params.gid);
       
       if (professor) {
           let activity = req.body;
           activity.groupId = professor.id;
           await activityModel.create(activity);
           
          res.status(200).json({
              message : 'created!'
          });
       } else {
           res.status(404).json({
                message : 'not found'
            });
       }
       
   } catch (err) {
       next(err);
   }
});

//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//

*/

/*
// ACTIVITY ROUTER
// Handle get request to /activities => response: a json array with all the activities from the database
app.get('/activity-api/activities', async(req, res, next) => {
   try {
       let activities = await activityModel.findAll();
       
       res.status(200).json(activities);
   } catch (err) {
       next(err);
   }
});

// Handle post request to /activities/add => add a new activity to the db
app.post('/activity-api/activities/add', async(req, res, next) => {
    try {
        let activity = await activityModel.create(req.body);
        res.status(200).json({
            message : 'created!'
        });
        
    } catch (err) {
        next(err);
    }
});

//----------------------------------------------------------------------------//
//----------------------------------------------------------------------------//
*/








// service mysql status
// sudo mysql -uroot
// CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
// GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'localhost';
// GRANT ALL PRIVILEGES ON myprojdb.* TO 'newuser'@'localhost';
// FLUSH PRIVILEGES;
//  mysql -uuser -ppassword