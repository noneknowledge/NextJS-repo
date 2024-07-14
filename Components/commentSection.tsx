'use client'

import { useGlobalValue, useComment, useLocalStorage, useHandleStatusCode } from "@/app/customHook"
import CommentSkeleton from "./commentSkeleton"
import { useEffect, useState } from "react"
import { formatDateToLong } from "@/libs/helper/formatDate"
import { REDUCER_ACTION_TYPE } from "@/context/reducer"




const initStatusCode:IStatusCode = {
    statusCode:1,
    message:"1",
    count:0
}


const CommentArea = (props:any) => {
    const {id,gameId,handleNoti} = props
    const  [statusCode,setStatus] = useHandleStatusCode()
    const [IStatusCode,setIStatusCode] = useState<IStatusCode>(statusCode)

    useEffect(()=>{
        setStatus(IStatusCode)

    },[IStatusCode])

    const postComment = async (e:any) =>{
        e.preventDefault()
        handleNoti("Pending...")

        const formData = new FormData(e.currentTarget) 
        e.currentTarget.reset()       
        const res = await fetch("http://localhost:3000/api/comment",
            {method:"POST", body:formData
        })
        const message = await res.json()

        const newStatusCode:IStatusCode = {
            statusCode:res.status,
            message:message,
            count:IStatusCode.count + 1
        }
        setIStatusCode(newStatusCode)

        // if(res.status === 201){  
        //     handleNoti("Post comment success")
        // }

        // else{
        //     const text = "Reply fail! " + message
        //     handleNoti(text)
        // }

    }

    return(
        <form className="mb-6" onSubmit={postComment}>
    <div hidden>
    <input name="userid" value={id} onChange={()=>{}}/>
    <input name="gameid" value={gameId} onChange={()=>{}}/>
    </div>
   
    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">Your comment</label>
        <textarea id="comment" rows={6} name="textarea"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..." required></textarea>
    </div>
    <button type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
        Post comment
    </button>
</form>
    )
}


const ReplyArea = (props:any) =>{
    const {commentId, handleNoti} = props

    const postReply = async (e:any) =>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget) 
        e.currentTarget.reset()       
        const res = await fetch(`http://localhost:3000/api/comment/${commentId}`,
            {method:"POST", body:formData
        })
        const message = await res.json()
        if(res.status === 201){
            const text = "Reply success " + message
            handleNoti(text)
        }
        else{

            const text = "Reply fail! " + message
            handleNoti(text)
        }
        
       
    }

    return(<>
        <form className="mb-6" onSubmit={postReply}>
                <div hidden>
                <input name="commentid" value={commentId} onChange={()=>{}} />
                </div>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows={6} name="replyarea"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." required></textarea>
            </div>
            <button type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Post comment
            </button>
        </form>
   </>)
}

const Article = (props:any) => {
    const [isReply,setReply] = useState(false)
    const {curId,child, userId, userName,avatar,commentId, makeNoti, createdAt, comment} = props

    return(<>
      <hr></hr>
         <article  className={child?"p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900":"p-6 text-base bg-white rounded-lg dark:bg-gray-900"}>
            <footer className="flex justify-between items-center mb-2">
                <div  className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"/>{userName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatDateToLong(createdAt) }</p>
                </div>
                <div className="relative">
                <DropDowncustom child={child} commentId={commentId} makeNoti={makeNoti} curId={curId} userId={userId} />
                </div>
                
                
            </footer>
            
            <p className="text-gray-500 dark:text-gray-400">{comment}</p>
            <div className="flex items-center mt-4 space-x-4">
                {!child && <button type="button" onClick={()=> setReply(!isReply)}
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    Reply
                </button>}
                
            </div>
            { 
                isReply && <ReplyArea commentId={commentId} handleNoti={makeNoti}/>
            }
            
            </article>
          
    </>)
}

const DropDowncustom = (props:any) =>{
    const {userId,curId,makeNoti,commentId,child } = props
    const [isShow,setShow] = useState(false)

    const removeComment = async() =>{
        if (userId === curId){
            makeNoti("Processing...")
            const res = await fetch(`http://localhost:3000/api/comment/${commentId}`,
                {method:"DELETE"})
            const mess = await res.json()
            if (res.status !== 200){
                makeNoti(mess.message)
            }
            else{
                makeNoti("Removed")
            }
        }
        else{
            makeNoti("You are not allowed to remove this comment")
        }
     
    }


    return(<>
        <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button" onClick={()=>setShow(!isShow)}>
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                    </button>
        {isShow && 
           <div className="absolute top-0 right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
       <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
           <li className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
               <button 
                   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit (Not do yet)</button>
           </li>
           {
            !child &&
            <li onClick={removeComment} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
               <button 
                   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</button>
           </li>
           }
           
           <li onClick={()=>setShow(!isShow)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
               <button 
                   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Close</button>
           </li>
       </ul>
   </div>
        }
    </>)
}

const CommentSectionLocalStorage = ({gameId}:any) =>{

        const [state,dispatch] = useGlobalValue()
        const [user,setUser] = useLocalStorage('user')
        const { comments, isLoading, isError } = useComment(gameId)
        
        const countComment = (comments:any[]) =>{
            const comment = comments.length
            let reply = 0
            comments.map(comment=>{
                reply += comment.reply.length
            })
            return comment + reply
        }

        const makeNoti = (text:string) =>{
            dispatch({type:REDUCER_ACTION_TYPE.SET_NOTI,payload:text})
        }
       
    
        if(isLoading){
            return (
             <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
             <div className="grid place-items-center">
            <CommentSkeleton/>
            </div>
            </section>
            )
        }
        if (isError){
            return (<>
                <div>Error</div>
            </>)
        }
        
        return(<>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                
      <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion   ({countComment(comments) }) </h2>
        </div>
        {user  && 
        <CommentArea id={user.id} gameId={gameId} handleNoti={makeNoti} />
        }
        {comments.map((comment:any,index:number)=>{
            
            return (
                <div key={index}>
                    <Article curId={user?user.id:null} child={false} makeNoti={makeNoti} comment={comment.comment} createdAt={comment.createAt} userId={comment.userId._id} userName={comment.userId.userName} avatar={comment.userId.userName} commentId={comment._id} />
            {comment.reply.map((rep:any,index:number)=>{
                return(<div key={index}>
                     <Article curId={user?user.id:null}  child={true} makeNoti={makeNoti} comment={rep.content} createdAt={rep.createdAt} userId={rep.userId._id} userName={rep.userId.userName} avatar={rep.userId.avatar} commentId={rep._id} />
                </div>)
            })}
            </div>
            )
        }
        )    
        }
    
    
        {/* <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"/>Michael Gough</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Feb. 8, 2022</p>
                </div>
                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                </button>
             
                <div id="dropdownComment1"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton">
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown can't use yet</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                        </li>
                    </ul>
                </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                instruments for the UX designers. The knowledge of the design tools are as important as the
                creation of the design strategy.</p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    Reply
                </button>
            </div>
        </article>
        <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="Jese Leos"/>Jese Leos</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Feb. 12, 2022</p>
                </div>
                <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                </button>
            
                <div id="dropdownComment2"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton">
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                        </li>
                    </ul>
                </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>                
                    Reply
                </button>
            </div>
        </article>
        <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="Jese Leos"/>Jese Leos</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Feb. 12, 2022</p>
                </div>
                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                </button>
             
                <div id="dropdownComment1"
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton">
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown can't use yet</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                        </li>
                        <li>
                            <a href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                        </li>
                    </ul>
                </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>                
                    Reply
                </button>
            </div>
        </article> */}
       
       
      </div>
    </section>
        </>)
    
}


const CommentSection = ({gameId}:any) =>{
    const [show,setShow] = useState(false)

    useEffect(()=>{
        setShow(true)
    },[])

    return(<>
    {show && <CommentSectionLocalStorage gameId={gameId} />}
    </>)
}


export default CommentSection