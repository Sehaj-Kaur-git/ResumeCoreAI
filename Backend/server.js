require('dotenv').config()
const app = require('./src/app')
const connecttoDB = require('./src/config/database')
const generateInterviewReport = require('./src/services/ai.service').generateInterviewReport
// const {resume, selfDescription, jobDescription} = require('./src/services/sampleData')
connecttoDB()
// generateInterviewReport({ resume, selfDescription, jobDescription })
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})