const express = require('express');

module.exports = function(sequelize, DataTypes) {
    var Feedback = sequelize.define('feedback', {
        time_stamp : {
            type : DataTypes.STRING,
            allowNull : false
        },
        
        id_activity : {
          type : DataTypes.STRING,
          allowNull : false
        },
        
        emoji : {
            type : DataTypes.STRING,
            allowNull : false
            }
        
    }, {
    timestamps : false
});
    
    return Feedback;
}