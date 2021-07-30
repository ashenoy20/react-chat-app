const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

//HttpOnly so you can't access cookies through frontend
const cookieOptions = {
    httpOnly: true,     
}

//Post route to login
router.post('/login' , async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({username: username})
    if(!user) res.send(false)

    bcrypt.compare(password, user.password, (error, success) => {
        if(error){
            res.status(500).send()
        }
        if(success){
            const tokenInfo = {name: username, id: user._id}
            const accessToken = jwt.sign(tokenInfo, process.env.SECRET_KEY)
            res.cookie('chatAppAccessToken', accessToken, cookieOptions).send()   
        }else{
            res.send(false)
        }
    })
})

//Post route to make a new user
router.post('/register' , async (req, res) => {
    try{
        const {username, email, password} = req.body
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({username, email, password: hashedPassword})
        await user.save()
        const tokenInfo = {name: username, id: user._id}
        const accessToken = jwt.sign(tokenInfo, process.env.SECRET_KEY)
        res.cookie('chatAppAccessToken', accessToken, cookieOptions).send()
    }catch(err){
        res.send(false)
    }
    
})

router.get('/logout', (req, res) => {
    const token = req.cookies.chatAppAccessToken
    if(token){
        res.cookie('chatAppAccessToken', "", {
            httpOnly: true,
            expires: new Date(0),
        }).send()
    }else{
        res.send(false)
    }   
})

router.get('/checkStatus', (req, res) => {
    try{
        const token = req.cookies.chatAppAccessToken
        
        if (!token) return res.send(false);
        jwt.verify(token, process.env.SECRET_KEY);
        res.send(true);
    }catch(err){
        res.send(false)
    }
})

router.get('/getUsername', (req, res) => {
    try{
        const token = req.cookies.chatAppAccessToken
        if (!token) return res.json(false);
        const value = jwtDecode(token)
        res.send(value)
    }catch(err){
        res.send(false)
    }

})


module.exports = router
