import express from 'express'

import database from './config/database'

import routes from './routes'

import { config } from 'dotenv'
import { urlencoded, json } from 'body-parser'
import cors from 'cors'

config({ path: `./.env.${process.env.NODE_ENV}` })

const app = express()
const port = 3000

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors())

database()
routes(app)

const server = app.listen(port, () => console.log('Server is running'))

export default server