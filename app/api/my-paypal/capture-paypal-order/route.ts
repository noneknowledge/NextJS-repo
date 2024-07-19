import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "../paypalAction";


export async function POST(req:NextRequest) {
    const data = await req.json()
    const {orderID} = data
    console.log("OrderID " + orderID)

    const response = await captureOrder(orderID)
    const message = await response.json()
    



    return NextResponse.json("Capture payment")
}