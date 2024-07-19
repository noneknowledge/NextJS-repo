import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "./paypalAction";



export async function POST(req:NextRequest){    

    const {cart} = await req.json()  
    var total = 0
    cart.map((cart:ICart)=>total += cart.price)
  
    const amount:IAmount = {
        value:total,
        currency_code: "USD",
        breakdown:{
            item_total:{
                value:total,
                currency_code: "USD",
            }       
        }
    } 
    const purchase_unit:IPurchaseUnit = {
        reference_id: "DH " + Date.now(),
        items: [],
        amount:amount
    }

    cart.map((x:ICart)=>{
        var item:IItem = {
            name:x.title,
            quantity: 1,
            unit_amount:{
                value:x.price,
                currency_code:"USD"
            },
           
        }
        purchase_unit.items.push(item)
    })
    
    const res = await createOrder([purchase_unit])
    const message = await res.json()

    console.log("capture orderID")
    console.log(message.id)


    return NextResponse.json(message)
}