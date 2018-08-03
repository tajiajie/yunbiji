const express = require('express')
const router = express.Router();
const pic = require('../database/pic')

router.get('/pic',(req,res) => {
    pic.find({}).then(data => {
        res.json({
            data,
            code: 200
        })
    })
})

module.exports = router;