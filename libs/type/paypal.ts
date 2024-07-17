interface IAuthResponse {
    scope:string
    access_token:string
    app_id:string
    token_type: string
    expires_in: number
    nonce:string
}

//https://developer.paypal.com/docs/api/orders/v1/



interface IItem {
    name:string
    quantity: 1
    price:number
    currency: "USD"
}

interface IAmount {
    currency: "USD"
    total:number
}

interface IPurchaseUnit {

    reference_id: string
    description?: string
    items: IItem[] | undefined
    redirect_urls: [{
        "return_url":"http://localhost:3000/"
    },{
        "cancel_url":"http://localhost:3000/"
    }]

}