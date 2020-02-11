const express = require('express')
const models = require('../models')

module.exports = (connection) => {
    const router = express.Router()
    
    router.post('/sync', async (req, res) => {
        try {
            await models.connection.sync({force : true})
        } catch (e) {
            res.status(500).json({message : ':('})
        }
    })
    
    return router
}
