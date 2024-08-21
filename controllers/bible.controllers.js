const {chatResponse,curatedResponse} = require('../actions/generation.js')

const getResponse = async(req,res) =>{
  try {
    // const body = req.body;
    const input = req.body.input;
    console.log(input)
    const response = await chatResponse(input)
    res.status(200).send(response)
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error getting AI response")
  }
}

//Get daily curated content
const getContent = async(req,res)=>{
  try {
    const input = req.body.input;
    const response = await curatedResponse(input)
    res.status(200).send(response)
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting curated content")
  }
}

module.exports = { getResponse,getContent}