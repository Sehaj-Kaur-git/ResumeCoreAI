const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: ["http://localhost:3001",
    "https://resume-core-ai.vercel.app/"],
    credentials: true,
  })
)


const authrouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes') // ✅ CHANGE THIS


app.use('/api/auth', authrouter)
app.use('/api/interview', interviewRouter) // ✅ CHANGE THIS

module.exports = app;