'use client'


import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const OrderItem = (props:any) => {
    const {item,currency_code} = props
    const width = 1000
    const height = 1000
    

    return(
        <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
            <div className="img-box max-lg:w-full">
                
                <Image width={width} height={height} src={item.gameid.images[0]} alt={item.title} 
                    className="aspect-square w-full lg:max-w-[140px] rounded-xl"/>
            </div>
            <div className="flex flex-row items-center w-full ">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                        <div className="">
                            <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                                {item.title}</h2>
                            <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                Diamond Dials</p>
                            <div className="flex items-center  ">
                                <p
                                    className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    Size: <span className="text-gray-500">Regular</span></p>
                                <p className="font-medium text-base leading-7 text-black ">Qty: <span
                                        className="text-gray-500">1</span></p>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">Price</p>
                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">${item.price}</p>
                            </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                            <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">Currency code
                                </p>
                                <p
                                    className="font-medium text-center text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                                    {currency_code}</p>
                            </div>

                        </div>
                        
                    </div>
                </div>


            </div>
        </div>
        )
}

const OrderDetailPage = ({params:{orderid}}:any) =>{
    
    const [data,setData] = useState<any>()
    const [isError,setError] = useState<boolean>(false)
    const router = useRouter()
   


    useEffect( () =>{
        const fetchData = async () =>{
            const response = await fetch(`http://localhost:3000/api/billing/${orderid}`)
            const message = await response.json()
        
            const badCode = [400,401,500]
            if(badCode.includes(response.status)){
                setError(true)
                if(response.status === 401){
                    router.push("/login")
                }

            }
            
            else{
                setData(message)
            }
            
        }
        fetchData()

    },[])


    if(isError)
        {
            return(<>
            <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, some error occured please try again later. You'll find lots to explore on the home page. </p>
                <Link href="/" className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
            </div>   
        </div>
    </section>
            </>)
        }
    if (!data){
        return(<div className="h-64">
            

<div className="text-left rtl:text-right">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>
<div className="text-center">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>
<div className="text-right rtl:text-left">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>

        </div>)
    }
    
    else{
        const {items,updatedAt} = data
        const d = new Date(updatedAt);
        const longDate = d.toLocaleDateString("en-US",{year:'numeric',month:'long',day:'numeric'})        

        return(<>
            <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                    Payment Successful
                </h2>
                <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
                    you can
                    check our order summary form below</p>
                <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                    <div
                        className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                            <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="text-indigo-600 font-medium">#{orderid}</span></p>
                            <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium"> {longDate}
                                </span></p>
                        </div>
                        <button
                            className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Track
                            Your Order</button>
                    </div>
                 
                    <div className="w-full px-3 min-[400px]:px-6">
                        {items.map((item:any,index:number)=>{

                            return( <OrderItem key={index} currency_code={data.currency_code} item={item} />)
                        })}
                       

                    </div>
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                            
                            <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Paid using Credit Card </p>
                        </div>
                        <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600"> $200.00</span></p>
                    </div>
    
                </div>
            </div>
        </section>
                                                
        </>)
    }
    
}

export default OrderDetailPage