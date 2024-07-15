import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("middleware")
    const token = request.cookies.get("token")?.value as string
    if (token){
      return NextResponse.next()
    }
    else{
      return NextResponse.redirect(new URL('/login', request.url))
    }   
}
 

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/profile',
}