'use client'

import { useEffect, useState } from "react"
import CartItem from "./cartItem"

const CartPage = () => {

    const [isLoading,setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
    },[])

    return(<>
        {!isLoading && <div className="py-10 grid place-items-center">
            <div className="w-4/5">
            <CartItem />
            </div>
            </div>}
    </>)
}

export default CartPage