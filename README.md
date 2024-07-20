# NextJS App - Typescript - Ecommerce web - Self Study

## Description:
    This project is a Ecommerce Website saling Game. Currently, this project only have some features like: create game for sale, update game, read games, add to wishlist, perform payment with PayPal API, user profile, search for games and users, basic login system with JWT.

## Run the project:
 You can clone the project to your local machine and run the following command: ```npm install``` and then ```npm run dev```

 But before run the ```npm run dev``` you may have to config the __.env__ file to your own value. [Go to .env section](#defined-env-file)

## Defined .env file
Currently, in this project i will have some variable such as:
- "ENVIROMENT" : To show that if the web is run on dev or not. For dev environment the value I use is 'Dev'. It only matter when you use PayPal because I only use this in that section.
- "CONNECTION_STRING": MongoDB connection string.
- "SECRECT_KEY" : Your secrect key to sign a token when use JWT.
- "NEXT_PUBLIC_CLIENT_ID" : PayPal CLIENT ID.
- "SECRECT_KEY_1" : PayPal ClIENT SECRET.

**_NOTE:_**  I might defined and push an example for that file

## Libraries use:
- @types/jsonwebtoken: version 9.0.6 [For more infomation about the package](#https://www.npmjs.com/package/@types/jsonwebtoken)
- @paypal/paypal-js: version 8.1.0 [For more infomation about the package](#https://www.npmjs.com/package/@paypal/paypal-js)
- @paypal/react-paypal-js: version 8.5.0 [For more infomation about the package](#https://www.npmjs.com/package/@paypal/react-paypal-js)



## CSS framework:
Tailwind CSS : For documentation and installation [Click Here](#https://tailwindcss.com/docs/installation)

