interface IStatusCode{
    statusCode:number,
    message:string,
    count : number,
}

interface IinitialReducer{
    error: string,
    logged:boolean,
    avatar: string,
    username: string,
    notiCount: number,
    cartCount: number,
}

interface ICart{
    gameid:string
    price:number
    title:string
}