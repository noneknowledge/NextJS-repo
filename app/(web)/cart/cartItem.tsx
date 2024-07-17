'use client'

import { useCart, useLocalCart } from "@/app/customHook"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ICheckBox {
    gameid:string,
    price:number,
}

const Cart = () =>{

    const [checkAll, setCheckAll] = useState(true)
    // const [checkboxes, setCheckBox] = useState<string[]>([])
    const [checkboxes, setCheckBox] = useState<ICheckBox[]>([])
    const [totalPrice,setTotal] = useState(0)
    const {items,isLoading,isError} = useCart()
    
    useEffect(()=>{
        var total = 0
        checkboxes.map((item:ICheckBox)=>{
            total += item.price
        })
        setTotal(total)
    },[checkboxes])

    const childCheckBox = (checked:boolean,gameid:string,price:number) =>{
        
        if (checked){
           
            setCheckBox(old=>[...old,{gameid,price}])
        }
        else{
            setCheckBox(old=> old.filter((id:ICheckBox)=> id.gameid !== gameid))  
        }
    }
    if(isLoading){
        return(<h1>Loading</h1>)
    }
    if (isError){
        
        return (<h1>Error !</h1>)
    }
    if(items === "jwt expired")
    {
        return (<h1>{items}</h1>)
    }

    return(<>
    <h1>Selected item:</h1>
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

                return (<CartItem parentCheck={checkAll} handleCheckBox={childCheckBox} key={index} game={game} />)
            })}
            
            
        </tbody>
    </table>
</div>
            <CartAction total={totalPrice}/>
    </>)
}

const CartItem = (props:any) =>{
    const {game,handleCheckBox,parentCheck} = props
    const id = game._id
    const {price, title, images} = game
    const [cart, setCart] = useLocalCart('user')
    const [isChecked,setChecked] = useState(false)

    useEffect(()=>{
        setChecked(parentCheck)
        
    },[parentCheck])
    useEffect(()=>{
        handleCheckBox(isChecked,id,price)
    },[isChecked])

    const remove = async(id:string) =>{
        const res = await fetch(`http://localhost:3000/api/game/${id}`,
            {method:"PATCH"})
        const message = await res.json() 
        
        if(message.count){
            setCart(message.count)
        }   
    }

    const checkedChange = () =>{
       
        setChecked(!isChecked)
        handleCheckBox(isChecked,id,price)
      
    }


    return(<>
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" checked={isChecked} onChange={()=>checkedChange()} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
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
    return(<>
        <div className="p-5 my-2 rounded-lg grid grid-cols-3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            <h1 className="text-white">Total: <span className="font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-400  hover:text-white border  ">${total} </span></h1>
            <button type="button" className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Remove</button>
            <button type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
            <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
            Check out with PayPal
            </button>

        </div>
    </>)
}


export default Cart