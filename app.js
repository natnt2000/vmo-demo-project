import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import database from './config/database'
import routes from './routes'

dotenv.config()
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

database()
routes(app)

app.listen(port, () => console.log(`Server is running`))