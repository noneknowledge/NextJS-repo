'use client '

import { useContext, useRef } from "react";
import { itemsContext } from "./cartItem";
import { PayPalScriptQueryParameters } from "@paypal/paypal-js"
import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useRouter } from "next/navigation";


const PayPalComponent = () =>{
        
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
    const [items,setStatus] = useContext(itemsContext)
    const router = useRouter()
    const ref = useRef<any>({}).current;
    ref.value = items

    const createOrder:PayPalButtonsComponentProps["createOrder"] = async() =>{

        try{
            const response = await fetch("http://localhost:3000/api/my-paypal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cart: ref.value,
                }),
            });
 
            const orderData = await response.json();
            if (!orderData.id) {
                throw new Error("Unexpected error occurred, please try again.");
            }
            return orderData.id;

        }

        catch(e){
            console.error(e);
            throw new Error("Error occured!");
        }
    }

    const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
        // Capture the funds from the transaction.
        
       


        const response = await fetch("http://localhost:3000/api/my-paypal/capture-paypal-order", {
            method: "POST",
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        });

        const details = await response.json();
        const passCode = [200,201]
        if(passCode.includes(response.status)){
            router.push("/payment-success")
        }
        else{
            alert(`Transaction completed by ${details}`);
            window.location.reload()
        }
        // Show success message to buyer
        
    };

    if(CLIENT_ID){
        const paypalInitOptions:PayPalScriptQueryParameters  ={
            clientId: CLIENT_ID 
        }
        return(<>
            <PayPalScriptProvider options={paypalInitOptions}>
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
            </PayPalScriptProvider>
            </>)
    }
    else{
        return(<>
        <h1>Client ID is missing</h1>
        </>)
    }
    
}

export default PayPalComponent