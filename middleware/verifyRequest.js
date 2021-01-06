import fs from 'fs'
import Ajv from 'ajv'

const verifyRequest = (req, res, next) => {
    const validateFilePath = JSON.parse(fs.readFileSync('./config/validateFilePath.json', 'utf-8'))
    const { originalUrl, method } = req
    const urlFinal = originalUrl.slice(-1) === '/' ? originalUrl.slice(0, originalUrl.length - 1) : originalUrl
    const validateSchema = JSON.parse(fs.readFileSync(validateFilePath[method][urlFinal], 'utf-8'))

    const ajv = new Ajv({ allErrors: true })
    const valid = ajv.validate(validateSchema, req.body)
    if (!valid) return res.status(400).send(ajv.errors)
    return next()
}

export default verifyRequest
