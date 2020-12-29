import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import projectStatusRoute from './routes/projectStatus.route'
import projectTypeRoute from './routes/projectType.route'

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
app.use('/api/projectTypes', projectTypeRoute)

app.listen(port, () => console.log(`Server is running`))