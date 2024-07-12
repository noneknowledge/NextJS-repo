import jwt from 'jsonwebtoken'

const {sign,verify} = jwt
const secret =  process.env.SECRECT_KEY as string

interface JwtPayload {
    id: string
    userName: string 
    iat: number
    exp: number
  }

export function checkToken(Token:any) {
    return verify(Token,secret) as JwtPayload
}

export function signToken(payload:any,expiresIn = 3600){
    return sign({userName:payload.userName,id:payload.id},secret,{expiresIn:expiresIn})
}
