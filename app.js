import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import projectStatusRoute from './routes/projectStatus.route'
import projectTypeRoute from './routes/projectType.route'
import techStackRoute from './routes/techStack.route'
import customerRoute from './routes/customer.route'
import departmentRoute from './routes/department.route'
import staffRoute from './routes/staff.route'
import projectRoute from './routes/project.route'

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
app.use('/api/techStacks', techStackRoute)
app.use('/api/customers', customerRoute)
app.use('/api/departments', departmentRoute)
app.use('/api/staffs', staffRoute)
app.use('/api/projects', projectRoute)

app.listen(port, () => console.log(`Server is running`))