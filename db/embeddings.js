const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '..', '.env') });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseClient = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// Read the file and split it into chunks
async function splitDocument(path) {
  try {
    if(path){

        console.log('Reading file:', path);
        const text = await fs.promises.readFile(path, 'utf-8');
    
        console.log('Splitting text into chunks...');
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 250,
          chunkOverlap: 40
        });
    
        const output = await splitter.createDocuments([text]);
        const textArr = output.map(chunk => chunk.pageContent);
    
        console.log('Text chunks:', textArr);
        return textArr;
    }
  } catch (error) {
    console.error(`Error splitting document ${path} `, error);
    throw error; // Re-throw the error to handle it at a higher level
  }
}

// Save to Supabase
async function saveToSupabase(embeddingData) {
  try {
    console.log('Saving embeddings to Supabase...');
    const { error } = await supabaseClient.from('daily_biblev1').insert(embeddingData);

    if (error) {
      console.error('Error saving to Supabase:', error);
      throw error; // Re-throw the error to handle it at a higher level
    } else {
      console.log('Embeddings saved successfully');
    }
  } catch (error) {
    console.error('Error saving to Supabase:', error);
  }
}

// Create embeddings function
 async function createEmbeddings(file) {
  try {
    console.log('Creating embeddings for file:', file);
    const text = await splitDocument(file);

    console.log('Loading embedding model...');
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
 
    const embeddingData = []
    
    for(const chunk of text) {
        console.log("creating embedding for chunk ",chunk)
        const result = await model.embedContent([chunk])
        embeddingData.push({content:chunk,embedding:result.embedding.values})
    }
    
   console.log(embeddingData)

   
    await saveToSupabase(embeddingData);
  } catch (error) {
    console.error('Error creating embeddings:', error);
  }
}

module.exports={createEmbeddings}