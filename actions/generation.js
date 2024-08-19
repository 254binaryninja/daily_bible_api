const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { createClient, FunctionsHttpError } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseClient = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


//create embeding from userInput
async function embedInput(userInput) {
    try {
        
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const response = await model.embedContent(userInput)

    const embedding = response.embedding.values;
    console.log("from embeddings",embedding)
    return embedding;
    } catch (error) {
        console.log(error)
    }
}


//retreive similar embedding from supabase

async function queryBible (embedding) {
    try {
        const { data,error } = await supabaseClient.rpc('match_handbook_docs',{
            query_embedding:embedding,
            match_threshold:0.50,
            match_count:2
        })

        if(error){
            console.log("Error from RPC METHOD",error)
        }

        const response = data.map((chunk)=>chunk.content)
        console.log("from rpc method",response)
        return response
        
       
    } catch (error) {
        console.log(error)
    }
}

//Generate chat response
async function generateResponse(userInput,context) {
    try {
        
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Provide advice as a pastor  to the user query "${userInput}" using on the following context "${context}"`;
  const result = await model.generateContentStream(prompt)
  const response = await result.response

  return response.text();
    } catch (error) {
       console.log(error) 
    }
  
}

//get response from  embedings

async function chatResponse (userInput) {
    const input = await embedInput(userInput);
    const response = await queryBible(input);
    const text = await generateResponse(userInput,response);

    return text;
}




//Generate Daily curated content for the user
async function curatedContentResponse(dailycontent,content) {
    try {
        
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Provide advice to the user  based on this topic "${dailycontent}" using on the following context "${content}"`;
  const result = await model.generateContentStream(prompt)
  const response = await result.response

  return response.text();
    } catch (error) {
       console.log(error) 
    }
  
}

async function curatedResponse (dailycontent) {
    const data = await embedInput(dailycontent)
    const text = await queryBible(data)
    const response = await curatedContentResponse(dailycontent,text)

    return response
}

module.exports = {chatResponse,curatedResponse}