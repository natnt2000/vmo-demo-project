import { getAll, getOne, create, update, remove } from '../controllers/projectStatus.controller'
import verifyRequest from '../middleware/verifyRequest.js'
import express from 'express'

const router = express.Router()

router.get('/', getAll)

router.get('/:id', getOne)

router.post('/', verifyRequest, create)

router.put('/:id', verifyRequest, update)

router.delete('/:id', remove)

export default router