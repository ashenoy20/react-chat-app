const mongoose = require('mongoose')
const Schema = mongoose.Schema


const groupSchema = new Schema({
    title: {
        type: String,
        required: true,     
    },   
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]


    
})

module.exports = mongoose.model('Group', groupSchema)