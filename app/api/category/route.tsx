import category from "@/models/category"
import { NextResponse } from "next/server"
import ConnectDB from "@/libs/db_config"
import { NextRequest } from "next/server"

export async function GET(req:NextRequest) {
    await ConnectDB()
    const res = await category.find({})
    console.log("API")
    console.log(res)
    return NextResponse.json(res)
}


export async function POST(req:NextRequest) {
    await ConnectDB()
    const formData = await req.formData();
   
    try{
        await category.create({title:formData.get('title'),description:formData.get('description')})
        return NextResponse.json("Add success!")
    }
    catch{
        return NextResponse.json({message:"Server error"},{status:404})
    }
    
 
}

