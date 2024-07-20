import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "./paypalAction";
import { checkToken } from "@/libs/helper";
import mongoose from "mongoose";
import ConnectDB from "@/libs/db_config";
import order from "@/models/order";
import player from "@/models/player";



export async function POST(req:NextRequest){    

    const token = req.cookies.get("token")?.value as string
        

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

    var buyItems:any[] = []
    cart.map((x:ICart)=>{
        var item:IItem = {
            name:x.title,
            quantity: 1,
            unit_amount:{
                value:x.price,
                currency_code:"USD"
            },
           
        }
        buyItems.push({title:x.title,price:x.price,gameid:x.gameid})
        purchase_unit.items.push(item)
    })
    
    const gameList = cart.map((x:ICart)=>x.gameid)

    const res = await createOrder([purchase_unit])
    const message = await res.json()

    console.log("capture orderID")
    console.log(message.id)

    try{
        if(!mongoose.connection.readyState){
            await ConnectDB()
        }

        if(token === null){
            return NextResponse.json("Unauthorized",{status:401})
        }
        const decode = checkToken(token)
        const {id} = decode 

        const user = await player.findById(id).select("_id wishList")

        user.wishList = user.wishList.filter((gameid:any)=> !gameList.includes(gameid.toString()))
        await user.save() 

        const newOrder = await order.create({
            orderID:message.id,
            total:amount.value,
            items:buyItems,
            payer:id
        })

        return NextResponse.json(message)
    }
    catch(e){
        return NextResponse.json("Error when try to add to db")
    }
}