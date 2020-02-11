module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define('student', {
       name : {
           type : DataTypes.STRING,
           allowNull: false,
           validate: {
               len : [3, 45]
           }
       },
       
       username : {
           type : DataTypes.STRING,
           allowNull : false,
           validate : {
               len : [3, 15]
           }
       },
       
       pass : {
           type : DataTypes.STRING,
           allowNull : false,
           validate : {
               len : [3, 10]
           }
       }
    }, {
    timestamps : false
});
    
    return Student;
}


















/*const Sequelize = require('sequelize');

let sequelize = new Sequelize('project_db', 'diana', 'pass', {
    dialect: 'mysql'
});

let Student = sequelize.define('students', {
    name : Sequelize.STRING,
    pass : Sequelize.STRING
});

Student.schema("public");
module.exports = Student;*/