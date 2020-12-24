import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import ProjectStatus from './models/projectStatus.js'

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

app.get('/test', async (req, res) => {
    try {
        const newProjectStatus = new ProjectStatus(req.body)
        const saveProjectStatus = await newProjectStatus.save()
        return res.json(saveProjectStatus)
    } catch (error) {
        return res.json(error)
    }
})

app.listen(port, () => console.log(`Server is running`))