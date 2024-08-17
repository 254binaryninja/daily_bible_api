import express from 'express'


const spotifyRoute = express.Router();

spotifyRoute.get('/',(req,res)=>{
    res.status(200).send("Hello from spotify API")
})


export default spotifyRoute