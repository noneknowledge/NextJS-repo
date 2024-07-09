

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

    // return bcrypt.hash(myPlaintextPassword, saltRounds, function(err:any, hash:any) {
    //     if(err){
    //         const message = "Hash fail " + err.message
    //         throw new Error(message)
    //     }
    //     console.log(hash)
    //     return hash
    //     // Store hash in your password DB.
    // });
}

export const checkPassWord = async (plainPassword:string,hash:any) =>{
    const result = bcrypt.compare(plainPassword,hash)
    if(!result){
        throw new Error("Compare password failed")
    }
    else{
        return result
    }

    // return bcrypt.compare(plainPassword, hash, function(err:any, result:boolean) {
    //     if(err){
    //         const errorMes = "compare password error: + " + err.message
    //         throw new Error(errorMes)
    //     }
    //     console.log(result)
    //     return result
    //     // result == true
    // });
}





