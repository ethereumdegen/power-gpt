import OpenAiController from "./openapi-controller"

 
import chalk from 'chalk'

require('dotenv').config();


const API_KEY = process.env.OPENAI_API_KEY!

if(!API_KEY) throw new Error("Missing OPENAI_API_KEY from env")

let aiController = new OpenAiController(API_KEY)

const AI_MODEL = process.env.AI_MODEL;
let aiModel:string = AI_MODEL || 'text-davinci-003'
  
 
//import cliSpinners from 'cli-spinners'
import ora from 'ora';


const running = true ; 

let mode = "text"

const modeColor = chalk.green

//@ts-ignore
import readline from 'readline-promise';
 

let lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });


async function handleUserInput(input:string){

    let response:any; 
    
    if(mode == 'image'){


        response = await aiController.generateImage({
            prompt: input
        })

        if(response && response.success){

            const result:any = response.data 
         
        
            return {success:true, data: result}
        }else{

            return {success:false, error: response.error}
        }



    }else{
        response = await aiController.query({
            prompt: input,
            model: aiModel
        }) 


        if(response && response.success){

            const result:any = response.data 
        
            const choice = result.choices[0]
        
            return {success:true, data: choice}
        }else{

            return {success:false, error: response.error}
        }


    }
   

}

function outputFormatted(rawResponse:any){

    if(rawResponse.text){
        console.log(`> ${rawResponse.text}`)
        return
    }

    console.log(JSON.stringify((rawResponse)))
}


function setupTerminal(){

    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY)
        process.stdin.setRawMode(true);

    process.stdin.on('keypress', (chunk, key) => {
        if(key && key.name == 'tab'){
            incrementMode(  )
        }
    
    });


}

function incrementMode( ){

    switch(mode){

        case 'text': mode = 'image';break;
        case 'image': mode = 'text';break;
        default: mode = 'text';break;
    }

    console.log(  modeColor(`mode switched to: ${mode}  \n`))


}

async function init(){

    const spinner = ora('Loading unicorns')

    console.log( 'Welcome to Power-GPT. \n \n' )


    setupTerminal()
  


    while (running){

        const question = chalk.blue(`What would you like to ask? ` )
        let modeLabel = modeColor(` mode: ${mode}  \n `)

        const userInput = await lineReader.questionAsync(question.concat(" ").concat(modeLabel)) 


        spinner.start(); 
       

        let response = await handleUserInput(userInput)

        spinner.stopAndPersist( )

        lineReader.close()
         
        lineReader = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true
          });

        if(response.success){
            const output = response.data 
            outputFormatted( output )
        }else{
            console.log(chalk.red(response.error))
        }
 

        
    }
    

}



init()