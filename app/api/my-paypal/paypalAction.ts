import { NextRequest, NextResponse } from "next/server"


//Example
//https://developer.paypal.com/api/rest/

const URL = process.env.ENVIROMENT === "Dev" ? "https://api-m.sandbox.paypal.com":"https://api-m.paypal.com"

export async function PayPalAuth():Promise<IAuthResponse> {
    
    const ClientID = process.env.NEXT_PUBLIC_CLIENT_ID
    const ClientSecret = process.env.SECRECT_KEY_1
    
    const auth = btoa(ClientID + ":" + ClientSecret)

    const res = await fetch(`${URL}/v1/oauth2/token`,{method:"POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": 'Basic ' + auth
        },
        body: 'grant_type=client_credentials'
    })
    const authRes:IAuthResponse = await res.json()
    
    return authRes
}

export async function createOrder(purchase_units:IPurchaseUnit[]) {
    
    const auth:IAuthResponse = await PayPalAuth()
    const {access_token} = auth
    console.log(access_token)
   
    const request = {
        intent:"CAPTURE",
        purchase_units
    }
    
    const res = await fetch(`${URL}/v2/checkout/orders`,{method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${access_token}`
        },
        body:JSON.stringify(request)
    })
    return res

}


export async function captureOrder(orderId:string) {

    const auth:IAuthResponse = await PayPalAuth()
    const {access_token} = auth

    const response = await fetch(`${URL}/v2/checkout/orders/${orderId}/capture`,{
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${access_token}`
        }
    })

    return response

}


