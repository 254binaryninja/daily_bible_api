import express from 'express'
import router from './routes/bible.routes.js';
import spotifyRoute from './routes/spotify.routes.js'

const port = 8080
const app = express();

//routes
app.use('/api/daily-bible',router)
app.use('/api/daily-bible/spotify',spotifyRoute)


app.listen(port,()=>{
    console.log(`Daily Bible listening on ${port}...`)
})