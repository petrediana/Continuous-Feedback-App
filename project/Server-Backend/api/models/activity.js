const express = require('express');

module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define('activity', {
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                len : [3, 45]
            }
        },
        
        start_date : {
            type : DataTypes.DATE,
            allowNull : false
        },
        
        end_date : {
            type : DataTypes.DATE,
            allowNull : false
        },
        
        count_emoji1 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                isInt : true,
                min : 0
            }
        },
        
        count_emoji2 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                isInt : true,
                min : 0
            }
        },
        
        count_emoji3 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                isInt : true,
                min : 0
            }
        },
        
        count_emoji4 : {
            type : DataTypes.INTEGER,
            allowNull : false,
            validate : {
                isInt : true,
                min : 0
            }
        }
    }, {
    timestamps : false
});
    
    return Activity;
}