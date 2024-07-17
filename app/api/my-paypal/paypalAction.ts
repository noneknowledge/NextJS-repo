import { NextRequest, NextResponse } from "next/server"


//Example
//https://developer.paypal.com/api/rest/

export async function PayPalAuth():Promise<IAuthResponse> {
    
    const keyPair = [{"grant_type":"client_credentials"}]
    const ClientID = process.env.NEXT_PUBLIC_CLIENT_ID
    const ClientSecret = process.env.SECRECT_KEY_1
    const URL = process.env.ENVIROMENT === "Dev" ? "https://api-m.sandbox.paypal.com":"https://api-m.paypal.com"
   
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
    console.log(purchase_units)
    
}


