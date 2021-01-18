import {promises as fs} from 'fs'
import Ajv from 'ajv'
import logger from '../helpers/logger.helper'
import { handleError } from '../helpers/response.helper'

const verifyRequest = async (req, res, next) => {
  try {
    const validateFilePath = JSON.parse(
      await fs.readFile('./src/config/validateFilePath.json', 'utf-8')
    )
    const { method } = req
    const routePath = req.route.path
    const validateSchema = JSON.parse(
      await fs.readFile(validateFilePath[method][routePath], 'utf-8')
    )

    const ajv = new Ajv({ allErrors: true })
    const valid = ajv.validate(validateSchema, req.body)
    if (!valid) return res.status(400).send(ajv.errors)
    return next()
  } catch (error) {
    logger.error(new Error(error.message))
    return res.status(500).json(handleError('Internal server error', 500))
  }
}

export default verifyRequest
