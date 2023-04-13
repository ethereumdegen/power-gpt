require('dotenv').config();



const API_KEY = process.env.OPENAI_API_KEY!

if(!API_KEY) throw new Error("Missing OPENAI_API_KEY from env")


export function getOpenAIApiKey():string{

    return API_KEY

}