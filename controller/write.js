const express = require('express')
const router = express.Router();
const writecontent = require('../database/writecontent')

router.post('/write',(req,res) => {

    if(req.session.user){
        let {title,content} = req.body;
        let author = req.session.user.username;

        writecontent.create({author,title,content}).then(data => {
            res.json({
                code: 200,
                msg: '发表成功',
                data
            })
        })
    }
    else {
        res.json({
            code: 402,
            msg: '请先登录',
        })
    }
})

router.get('/list',(req,res) => {
    writecontent.find({}).sort({_id:-1}).then(data => {
        res.json({
            data,
            code: 200
        })
    })
})

// router.get('/list/:id',(req,res) => {
//     let {id} = req.params;
//     writecontent.find({}).then( data => {
//         res.json({
//             code: 200,
//             data
//         })
//     })
// })
module.exports = router;
