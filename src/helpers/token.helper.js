import { sign, verify, decode } from 'jsonwebtoken'

const jwtSign = (payload, secretKey, expiredTime) =>
  sign(payload, secretKey, { expiresIn: expiredTime })

const jwtVerify = (token, secretKey) => verify(token, secretKey)

const jwtDecode = (token, secretKey) => decode(token, secretKey)

export { jwtSign, jwtDecode, jwtVerify }
