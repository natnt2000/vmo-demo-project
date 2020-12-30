import { getAllTechStacks, getOneTechStack, createTechStack, updateTechStack, deleteTechStack } from '../controllers/techStack.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'

const router = express.Router()

router.get('/', getAllTechStacks)

router.get('/:id', getOneTechStack)

router.post('/', verifyRequest, createTechStack)

router.put('/:id', verifyRequest, updateTechStack)

router.delete('/:id', deleteTechStack)

export default router
