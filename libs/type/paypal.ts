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
    unit_amount: {
        currency_code: "USD",
        value:  number
    }
    
}

interface IAmount {
    currency_code: "USD"
    value:number,
    breakdown: IBreakdown

    
}

interface IBreakdown {
    item_total: {
        currency_code: "USD"
        value:number,
    }

}

interface IPurchaseUnit {

    reference_id: string
    items: IItem[] 
    amount:IAmount

}