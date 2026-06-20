require('dotenv').config()
const app = require('./src/app')
const connecttoDB = require('./src/config/database')
const generateInterviewReport = require('./src/services/ai.service').generateInterviewReport
// const {resume, selfDescription, jobDescription} = require('./src/services/sampleData')
connecttoDB()
// generateInterviewReport({ resume, selfDescription, jobDescription })
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})