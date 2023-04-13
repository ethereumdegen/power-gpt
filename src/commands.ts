



import { createCompletion, createImage, getModels } from "../lib/openai-lib"


const commandsMap:any= {

  'getModels': getModels
  'createCompletion': createCompletion


} 





async function runCommand(){

   let cmd = 'getModels'

   let commandFn = commandsMap[cmd]


   let response = await commandFn.call()
 
   if(response.status == 200){

    console.log(response.data)
   }else{
    console.log(response.error)
   }
}

runCommand()