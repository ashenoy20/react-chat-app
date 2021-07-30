const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Group = require('../models/group')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')


const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.chatAppAccessToken
        if(!token) {
            res.status(403).send(false)  
        }else{
            jwt.verify(token, process.env.SECRET_KEY)
            next()
        }   
    } catch (error) {
        res.status(403).send(false)
    }
   

}

router.post('/makeGroup', authMiddleware, async (req, res) => {
    try {
        const token = req.cookies.chatAppAccessToken
        const {id} = jwtDecode(token) 
        const {target, title} = req.body
        const targetUser = await User.findOne({username: target})
        const groupIds = [id, targetUser._id]
        const newGroup = new Group({members: groupIds, title})
        await newGroup.save()
        res.send(true)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deleteGroup', authMiddleware, async (req, res) => {
    try {
        const id = req.body.id
        await Group.findByIdAndDelete(id)
        res.send(true)
    } catch (error) {
        res.send(error)
    }
})

router.get('/getGroups', authMiddleware, async (req, res) => {
    try {
        const token = req.cookies.chatAppAccessToken
        const {id} = jwtDecode(token)  
        const group = await Group.find({members: id})
        res.send(group)     
    } catch (error) {
        res.send(error)
    }
})

router.get('/groups/:id', authMiddleware, async (req, res) => {
    const {id} = req.params
    if(id === 'null'){
        res.send(null)
    }else{
        const group = await Group.findById(id)
        res.send(group)
    }
   
    
})


module.exports = router
