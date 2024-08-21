// This will contain a function to create embeddings and save them to supabase and it is to be ran once once you set the main bible version you use
// For example as you can see I'm using the Authorized King James Version -English
const {createEmbeddings} = require('./db/embeddings.js')
const {chatResponse,curatedResponse} = require('./actions/generation.js')

const embed = async(path)=>{
    createEmbeddings(path)
}

embed('./Psalms.txt')

// const response = async(input) =>{
//     const text = await curatedResponse(input)
//     console.log(text)
// }

// response('sin')