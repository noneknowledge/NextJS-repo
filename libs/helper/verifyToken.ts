import jwt from 'jsonwebtoken'

const {sign,verify} = jwt
const secret =  process.env.SECRECT_KEY as string

export function checkToken(Token:any) {
    return verify(Token,secret)
}

export function signToken(payload:any,expiresIn = 3600){
    return sign({userName:payload.userName,id:payload.id},secret,{expiresIn:expiresIn})
}
