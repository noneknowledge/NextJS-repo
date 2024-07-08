import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest,{params}:any) {
    const {userId} = params

    return NextResponse.json(userId)
    
}