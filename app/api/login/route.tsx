import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/db_config";
import mongoose from "mongoose";
import user from "@/models/user";
import { checkPassWord } from "@/libs/helper/hash";



export async function POST(req:NextRequest) {
    const formData = await req.formData();
    
    if(!mongoose.connection.readyState){
        await ConnectDB()
    }
    const userName = formData.get("username") as string
    const passWord = formData.get("password") as string
    try{
        const loginUser:any = await user.findOne({userName:userName})
        if(!loginUser){
            return NextResponse.json({message:"User not found"},{status:400})
        }
        else{
            const result = await checkPassWord(passWord,loginUser.passWord)
       
            if(result){
                //Asign JWT here 

                return NextResponse.json({message:"login success"},{status:200})
            }
            else{
                return NextResponse.json({message:"login fail"},{status:200})
            }
        }
    }
    catch(err:any){
        const mess = "Login failed: " + err.message
        return NextResponse.json({message:mess},{status:400})
    }
   


    
    
}