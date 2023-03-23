import OpenAiController from "./openapi-controller"
require('dotenv').config();

console.log('booting power gpt')


const API_KEY = process.env.OPENAI_API_KEY!

let aiController = new OpenAiController(API_KEY)

async function init(){

    //commander interface here 

    let result = await aiController.query({
        prompt: "Make a list of astronomical observatories:"

    })

    console.log({result})
    console.log(JSON.stringify(result))
}


init()