import express from "express"
import mongoose from "mongoose"
import dontenv from "dotenv"
import cors from 'cors'
import bodyParser from "body-parser"
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentsRoutes from './routes/comments.js'
import path from 'path'
import createSocketServer from './socket.js';

dontenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use('/uploads', express.static(path.join('uploads')))

app.get('/', (req, res) => {
  res.send("hello")
})
app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/video', videoRoutes)
app.use('/comment', commentsRoutes)
app.get('/video-call', (req, res) => {
  res.send("Video Call Page");
});

const server = createSocketServer(app);



const PORT =  5000
server.listen(PORT, () => {
  console.log(`Server Running on the PORT ${PORT}`)
  console.log("Video Call Server is running on port 5000")
})

const DB_URL = process.env.CONNECTION_URL
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("MongoDB database connected")
}).catch((error) => {
  console.log(error)
})