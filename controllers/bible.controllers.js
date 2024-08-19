const {chatResponse,curatedResponse} = require('../actions/generation.js')

const getResponse = async(req,res) =>{
  try {
    const input = req.body;
    const response = chatResponse(input)
    res.status(200).send(response)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error getting AI response")
  }
}

//Get daily curated content
const getContent = async(req,res)=>{
  try {
    const input = req.body;
    const response = curatedResponse(input)
    res.status(200).send(response)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting curated content")
  }
}

export {getResponse,getContent}