import { checkToken } from "@/libs/helper";
import order from "@/models/order";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:any) {
    const {orderid} = params
    const token = req.cookies.get("token")?.value as string

    if(token === null){
        return NextResponse.json("Unauthorized",{status:401})
    }
    try{
        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        const decode = checkToken(token)
        const {id} = decode 
        
        return NextResponse.json(orderid)
    }
    catch(e:any){
        return NextResponse.json("Error",{status:500})
    }
   
}