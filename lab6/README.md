# Running the app 

This app was developped using `nodeJS`. Below are a list of specifications and instructions on how to run the app.

## Requirements
- Make sure you have `node.js` installed. 
- Upon downloading the lab folder or the repo, run `npm install` to install all dependencies. 
- `.env` Environment variables stored in a `.env` file on the same layer as the `server.js` file, 
    containing the firebase serviceKey
    + Note that the Vercel deployment uses a database already containing the database setup
        * Main collection : results --verbatim
        * Sub-directories : (username) --auto-generated

## Node commands
- `npm run start`: Starts app in product mode
- `npm run dev` : Starts app in dev mode

#### Known issues
- Nodemon doesn't refresh the home page;
- Edge's rendition of the results page looks horrendous