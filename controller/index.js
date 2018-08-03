const express = require('express')
const router = express.Router();

const region = require('./region')
const login = require('./login')
const write = require('./write')
const image = require('./image')
var path = require('path')

router.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname, '../pages/index.html'))

})

router.use(region)
router.use(login)
router.use(write)
router.use(image)

module.exports = router