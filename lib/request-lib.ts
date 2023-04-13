
/*

GET
 
https://api.openai.com/v1/models

*/

import axios,{Method} from 'axios'


export function getOpenAiKeyHeader(OPENAI_API_KEY:string){

    return `Bearer ${OPENAI_API_KEY}`
}




export async function tryRequest({
    method,
    url,
    data,
    headers
}:{
    method:Method,
    url:string,
    data?:any,
    headers?:any 
}) {

    try{
   
    let response =  await axios({
        method ,
        url ,
        data ,
        headers
      });
      
      return response 
    }catch(e){
        console.error(e)

        console.error(JSON.stringify(e))
    }


}