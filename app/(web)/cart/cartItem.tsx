'use client'

import { useCart, useHandleStatusCode, useLocalCart } from "@/app/customHook"
import Image from "next/image"
import Link from "next/link"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import PayPalComponent from "./paypalButton"

interface ICheckBox {
    gameid:string,
    title:string,
    price:number,
}

export const itemsContext = createContext<any>("ICheckbox")

const Cart = () =>{
    
    
    const [checkAll, setCheckAll] = useState(false)
    // const [checkboxes, setCheckBox] = useState<string[]>([])
    const [checkboxes, setCheckBox] = useState<ICheckBox[]>([])
    const [totalPrice,setTotal] = useState(0)
    const {items,isLoading,isError} = useCart()
    const [statusCode,setStatus] = useHandleStatusCode()
  
    
    useEffect(()=>{
        var total = 0
        checkboxes.map((item:ICheckBox)=>{
            total += item.price
        })
        setTotal(total)
    },[checkboxes])

    const childCheckBox = (checked:boolean,gameid:string,title:string,price:number) =>{
        
        if (checked){
           
            setCheckBox(old=>[...old,{gameid,title,price}])
        }
        else{
            setCheckBox(old=> old.filter((id:ICheckBox)=> id.gameid !== gameid))  
        }
    }
    if(isLoading){
        return(<h1>Loading</h1>)
    }
    if (isError){
       
        return (
        <div className="flex justify-center">
            <h1 className="p-2 m-2">Error ! {isError.message}</h1>
            <Link href="/login" className="py-2 my-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</Link>
        </div>
     
        )
    }
    if(items === "jwt expired")
    {
        return (<h1>{items}</h1>)
    }

    return(<>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input checked={checkAll} onChange={()=>setCheckAll(!checkAll)} id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {items.map((game:any,index:number)=>{

                return (<CartItem handleStatus={setStatus} parentCheck={checkAll} handleCheckBox={childCheckBox} key={index} game={game} />)
            })}
            
            
        </tbody>
    </table>
</div>      
            <itemsContext.Provider value={[checkboxes,setStatus]}>
                <CartAction total={totalPrice}/>
            </itemsContext.Provider>
            
    </>)
}

const CartItem = (props:any) =>{
    const {game,handleCheckBox,parentCheck,handleStatus} = props
    const id = game._id
    const {price, title, images} = game
    const [cart, setCart] = useLocalCart('user')
    const [isChecked,setChecked] = useState(false)

    useEffect(()=>{
        setChecked(parentCheck)
        
    },[parentCheck])
    useEffect(()=>{
        handleCheckBox(isChecked,id,title,price)
    },[isChecked])

    const remove = async(id:string) =>{
        const res = await fetch(`http://localhost:3000/api/game/${id}`,
            {method:"PATCH"})
        const message = await res.json() 
        handleStatus(res.status)
        if(message.count){
            setCart(message.count)
        }   
    }

    const checkedChange = () =>{
       
        setChecked(!isChecked)
        handleCheckBox(isChecked,id,title,price)
      
    }


    return(<>
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id={id} checked={isChecked} onChange={()=>checkedChange()} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor={id} className="sr-only">checkbox</label>
                    </div>
                </td>
                <th style={{width:"230px",height:"150px"}} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Image width={230} height={150} style={{height:"100%",width:"100%"}} src={images[0]} alt={title}/>
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {title}
                </th>
                <td className="px-6 py-4">
                    ${price}
                </td>
                <td className="px-6 py-4 px-4">
                    <button onClick={()=>remove(game._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
                </td>
            </tr>
    </>)
}

const CartAction = (props:any) =>{
    const {total} = props
    const [cart, setCart] = useLocalCart('user')
    const [items,setStatus] = useContext(itemsContext)
    const ref = useRef<any>({}).current;
    ref.value = items

    const removeSelected = async() =>{
        const res = await fetch("http://localhost:3000/api/cart",{method:"PATCH",
            body:JSON.stringify({
                cart: ref.value,
            }),
        })
        
        const message = await res.json()
        if(res.status === 200){
            setCart(message.wishList.length)
        }
        setStatus(res.status as number)

        
        console.log(message)
        
    }

    return(<>
        <div className="p-5 my-2 rounded-lg grid grid-cols-3 gap-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <h1 className="text-white content-center">Total: <span className="font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-400  hover:text-white border  ">${total} </span></h1>
            <button onClick={removeSelected} type="button" className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Remove</button>
            <PayPalComponent />

        </div>
    </>)
}






export default Cart