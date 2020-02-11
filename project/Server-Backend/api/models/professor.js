const express = require('express');

module.exports = function(sequelize, DataTypes) {
    var Professor = sequelize.define('professor', {
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                len : [3, 70]
            }
        },
        
        specialty : {
          type : DataTypes.STRING,
          allowNull : false,
          validate : {
              len : [3, 20]
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
    
    return Professor;
}