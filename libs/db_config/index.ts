import mongoose from "mongoose";


const ConnectDB = async () =>{
    console.log("Connecting ...")
    try{
        const URL = process.env.CONNECTION_STRING + "/game_next"
        console.log(URL)
        await mongoose.connect(URL);
        console.log("Connection success!")
    }
    catch{
        console.log("Connection failure!")
    }
    



}

export default ConnectDB