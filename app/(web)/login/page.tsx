'use client'


import { useAuth } from "@/app/customHook"
import { REDUCER_ACTION_TYPE } from "@/context/reducer"
import { Metadata } from "next"
import Image from "next/image"

import { useRouter } from "next/navigation"
import { useState } from "react"




const LoginPage = ()=>{
    const [state,dispatch] = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const postLogin = async(formValue:FormData) =>{
      return await fetch("http://localhost:3000/api/login",{method:"POST",body:formValue})
    }

    const Login = async(e:any) =>{
      setLoading(true)
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const response = await postLogin(formData)
      const message = await response.json()
      if(response.status === 200){
        
        alert("login success")
        const token = message.token
        const username = message.username
        const id = message.id
        dispatch({type: REDUCER_ACTION_TYPE.SET_LOGIN, put: {
          token:token, name: username, id: id
        }})
        return router.push("/profile")
        //store token in useContext or cookie
      }
      else{
        alert("login fail")
        
        console.log(message)
        setLoading(false)
       
      }

    }

    return(
        <>
        {loading &&
           <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           <div role="status">
               <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                   <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
               </svg>
               <span className="sr-only">Loading...</span>
           </div>
       </div>
        }
     
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <Image width={2000} height={2000} style={{width:"100%",height:'100%'}} className="mx-auto h-10 w-auto" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7a3ec529632909.55fc107b84b8c.png" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={Login} className="space-y-6">
      <div>
        <label htmlFor="usename" className="block text-sm font-medium leading-6 text-gray-900">UserName</label>
        <div className="mt-2">
          <input id="usename" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password"/>
        </div>
      </div>

      <div>
        <button disabled={loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>

        </>
    )

}
export default LoginPage


