require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
const mongoose = require('mongoose')
const authRoutes = require('./routers/authRouter')
const dataRoutes = require('./routers/dataRouter')

const cookieParser = require('cookie-parser');


mongoose.connect('mongodb://localhost:27017/chat-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(cookieParser())

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/data', dataRoutes)

io.on('connection', (socket) => {
    console.log("We have a new connection")

    socket.on('join', (username) => {
        console.log(username)
    })

    socket.on('disconnect', () => {
        console.log('User left')
    })
})

server.listen(5000, () => {
    console.log("Running on port 5000")
})