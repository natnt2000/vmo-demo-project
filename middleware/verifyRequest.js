import fs from 'fs'
import Ajv from 'ajv'

const verifyRequest = (req, res, next) => {
    const { baseUrl, method } = req
    const dirName = baseUrl.split('/')[2]
    const fileName = method === 'POST' ? 'create' : 'update'
    const validateSchema = JSON.parse(fs.readFileSync(`./json/${dirName}/${fileName}.json`, 'utf-8'))

    const ajv = new Ajv({ allErrors: true })
    const valid = ajv.validate(validateSchema, req.body)
    if (!valid) return res.status(400).send(ajv.errors)
    return next()
}

export default verifyRequest
