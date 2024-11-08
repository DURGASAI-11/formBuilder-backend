const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = express()
const connectDB = require('./Database/ConnectDB')
const formRouter = require('./Routes/FormRouter')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/form', formRouter)

app.listen(process.env.PORT, async () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`)
  await connectDB(process.env.MONGODB_URI)
})
