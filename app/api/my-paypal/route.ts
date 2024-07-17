import { NextRequest, NextResponse } from "next/server";
import { PayPalAuth } from "./paypalAction";



export async function GET(req:NextRequest) {
    const res:IAuthResponse = await PayPalAuth()

    return NextResponse.json(res)
}

export async function POST(req:NextRequest){

    
    console.log("body")
    console.log(await req.json())
    console.log("body")

    return NextResponse.json("dw")
}