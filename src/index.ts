import OpenAiController from "./openapi-controller"

 
import chalk from 'chalk'

require('dotenv').config();


const API_KEY = process.env.OPENAI_API_KEY!

let aiController = new OpenAiController(API_KEY)
 
//import { Command } from "commander"; // add this line
 
  
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
        console.log(rawResponse.text)
        return
    }

    console.log(JSON.stringify((rawResponse)))
}

async function init(){


    console.log( 'Welcome to Power-GPT.' )
 

    while (running){

        const question = chalk.blue(`What would you like to ask? \r\n ` )

        const userInput = await lineReader.questionAsync(question) 

     //   console.log( chalk.blue(`What would you like to ask? \r\n ` ) )
      
        let response = await handleUserInput(userInput)

        if(response.success){
            outputFormatted(response.data)
        }else{
            console.log(chalk.red(response.error))
        }

    
     

        
    }
   

    //commander interface here 

}



init()