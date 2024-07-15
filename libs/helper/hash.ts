

const bcrypt = require("bcrypt")
const saltRounds = 10


export const hashPassWord = async(myPlaintextPassword:string) =>{

    const hash = await bcrypt.hash(myPlaintextPassword,saltRounds)
    if (!hash){
        throw new Error("Something went wrong")
    }
    else{
        return hash
    }
}

export const checkPassWord = async (plainPassword:string,hash:any) =>{
    const result = bcrypt.compare(plainPassword,hash)
    if(!result){
        throw new Error("Compare password failed")
    }
    else{
        return result
    }

}





