// This will contain a function to create embeddings and save them to supabase and it is to be ran once once you set the main bible version you use
// For example as you can see I'm using the Authorized King James Version -English
const {createEmbeddings} = require('./db/embeddings.js')


const embed = async(path)=>{
    createEmbeddings(path)
}

embed('./db/kjv.tsx')