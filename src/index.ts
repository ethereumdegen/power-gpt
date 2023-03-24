import OpenAiController from "./openapi-controller"

 
import chalk from 'chalk'

require('dotenv').config();


const API_KEY = process.env.OPENAI_API_KEY!

if(!API_KEY) throw new Error("Missing OPENAI_API_KEY from env")

let aiController = new OpenAiController(API_KEY)
  
  
const running = true ; 


//@ts-ignore
import readline from 'readline-promise';

//import readline from 'readline'

const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });


async function handleUserInput(input:string){

    let response = await aiController.query({
        prompt: input

    })

    if(response.success){

        const result:any = response.data 
    
        const choices = result.choices 
    
        return {success:true, data: choices}
    }

    return {success:false, error: response.error}

}

function outputFormatted(rawResponse:any){

    if(rawResponse.text){
        console.log(`> ${rawResponse.text}`)
        return
    }

    console.log(JSON.stringify((rawResponse)))
}

async function init(){


    console.log( 'Welcome to Power-GPT.' )
 

    while (running){

        const question = chalk.blue(`What would you like to ask? \r\n ` )

        const userInput = await lineReader.questionAsync(question) 
    
        let response = await handleUserInput(userInput)

        if(response.success){
            const output = response.data[0]
            outputFormatted( output )
        }else{
            console.log(chalk.red(response.error))
        }
 

        
    }
    

}



init()