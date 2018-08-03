const express = require('express')
const router = express.Router();
const user = require('../database/user')

router.post('/login',(req,res) => {
    let {password,email} = req.body;

    user.findOne({email}).then(data => {
        if(data){
            if(password == data.password){
                req.session.user = data;

                let usermsg = {};
                usermsg.username = data.username;
                usermsg.email = data.email;

                res.json({
                    code:200,
                    data:usermsg,
                    msg:'登录成功'
                })
            }
            else {
                res.json({
                    code: 401,
                    msg:'密码不正确'
                })
            }
        }
        else {
            rqs.json({
                code: 401,
                msg:'用户名不存在'
            })
        }
    })
})

// router.get('/get',(req,res) => {
//     if(req.session.user){
//         res.json({
//             msg:'你是已经登录的用户'
//         })
//     }
//     else {
//         res.json({
//             msg:'你是没有登录的用户'
//         })
//     }
// })


router.delete('/logOut', (req, res) => {
    req.session.destroy(function (err) {
        if(err){
            console.log(err)
        }
        else {
            res.clearCookie('sid');
            res.json({
                code: 200,
                msg: '退出登陆成功'
            })
        }
    })

})

module.exports = router;