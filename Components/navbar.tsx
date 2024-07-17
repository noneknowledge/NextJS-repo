'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalValue, useLocalStorage } from "@/app/customHook";
import { REDUCER_ACTION_TYPE } from "@/context/reducer";
import { initialState } from "@/context/reducer";

const AvatarSection = () =>{

  //Tach 2 phan de khi render xong thi moi dung dc localstorage
      const router = useRouter()
      const curPath = usePathname()
      const [user,setUser] = useLocalStorage("user")
      const [state,dispatch] = useGlobalValue()

      

      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const closeDropdown = () => {
      setIsOpen(false);
      };
        const [isOpen, setIsOpen] = useState(false)
        const logOut = () =>{
          setUser(null)
          dispatch({type:REDUCER_ACTION_TYPE.SET_LOGOUT})
          router.push("/")
          
        }


    useEffect(()=>{
      if(user){
        const loggedUser = {...initialState,avatar:user.avatar,username:user.username,logged:true,cartCount:user.cart} 
       
        dispatch({type:REDUCER_ACTION_TYPE.SET_LOGIN,put:loggedUser})
      }
    },[])

    return (<>
    {!state.logged &&
                <>
                <Link href="/login" className={curPath !== "/login"?"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white":"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"}>Login</Link>
                <Link href="/register" className={curPath !== "/register"?"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white":"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"}>Register</Link>
                </>
              }

              {state.logged &&
              <>
              <Link href='/cart' className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5"></span>
                <div className="relative py-2">
                  <div className="t-0 absolute left-3">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{state.cartCount}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>
              </Link>
              <div className="relative ml-3">
                <div>
                  <button onClick={toggleDropdown } type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image className="h-8 w-8 rounded-full" width={50} height={50} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </button>
                </div>
                  {isOpen &&(
           
                    <div onClick={closeDropdown }className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                        <Link onClick={closeDropdown } href="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">Your Profile: {state.username}</Link>
                        <Link onClick={closeDropdown }  href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">Settings</Link>
                        <button onClick={e => logOut() }   className="block px-4 py-2 text-sm text-gray-700" role="menuitem"  id="user-menu-item-2">Sign out</button>
                    </div>
                  )}
              </div></>}</>)
}


const NavBar = () =>{

    const curPath = usePathname()
    const [loading,setLoad] = useState(true)
    const [input,setInput] = useState("")
    const router = useRouter()

    useEffect(()=>{
      setLoad(false)
    },[])
    
    const search = async () =>{
      if(input !== ""){
        router.push(`/search/${input}`)
        
      }
      return
    }

    const handleInputEnter = (event:any) =>{
      if(event.key === 'Enter'){
        search()
      }
    }

    

    return(
    <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
               
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image className="h-8 w-auto" width={50} height={50} src="https://www.shecodes.io/assets/branding/logo-shecodes-3dfa60aeab8ef361842da5a2b6d46db3af1b7afafefee3dde0a9846389de754b.png" alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
               
                  <Link href="/"  className={curPath !== "/"?"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white":"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"} >Home</Link>

                  <Link href="/game" className={curPath !== "/game"?"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white":"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"}>Game</Link>
                  <Link href="/game/add" className={curPath !== "/lesson"?"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white":"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"}>Add game</Link>
                  <Link href="/community" className={curPath !== "/lesson"?"rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white":"rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"}>Community</Link>
                
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          
              <button onClick={()=>search()} type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
              </button>
              <input onKeyPress={handleInputEnter} value={input} onChange={e=>setInput(e.target.value)} className="rounded-lg mx-2 px-5" placeholder="search" type='text' />
              {!loading && <AvatarSection />}
            </div>
          </div>
        </div>
      
        
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" >Home</Link>
            <Link href="/game" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Game</Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</Link>
          </div>
        </div>
      </nav>
      )
}

export default NavBar;