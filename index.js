const express = require('express')
const router = require('./routes/bible.routes.js');
//import spotifyRoute from './routes/spotify.routes.js'

const port = 8080
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/v1/daily-bible',router)

//app.use('/api/daily-bible/spotify',spotifyRoute)


// //middleware

app.listen(port,()=>{
    console.log(`Daily Bible listening on ${port}...`)
})