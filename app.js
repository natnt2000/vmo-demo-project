import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import projectStatusRoute from './routes/projectStatus.route.js'

dotenv.config()
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    () => console.log("Connected to DB")
)

app.use('/api/projectStatuses', projectStatusRoute)

app.listen(port, () => console.log(`Server is running`))