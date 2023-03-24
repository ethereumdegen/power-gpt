
 

    import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from 'openai'



export interface QueryInput {
    prompt:string,
    model?:string,  
    max_tokens?: number

}

export interface ImageInput {
    prompt:string,
    size?:CreateImageRequestSizeEnum
   

}

const DEFAULT_MODEL = "text-davinci-003" //"gpt-3.5-turbo"

export default class OpenAiController {

    configuration:Configuration
    instance:OpenAIApi
   

    constructor(apiKey: string){



        this.configuration = new Configuration({
            apiKey,
            });
        
        this.instance = new OpenAIApi(this.configuration)


    }

    async query(input:QueryInput){

        try{
        const response = await this.instance.createCompletion({
                model: input.model ? input.model : DEFAULT_MODEL , //"gpt-3.5-turbo",
                prompt: input.prompt,
                temperature: 0,
                max_tokens: input.max_tokens?  input.max_tokens :1000,
        });
   

            if(response.status == 200){ 
                return {success:true, data: response.data}
            }else{
                return {success:false, error: response.statusText}
            }
        }catch(e:any){
            return {success:false, error: e.toString()}
        }
       
    

    }


    async generateImage(input:ImageInput){
        try{

        const response = await this.instance.createImage ({
            prompt:  input.prompt,
            n:1,
            size: input.size? input.size :  "512x512"
         } )

         if(response.status == 200){
            return {success:true, data: response.data}
        }else{
            return {success:false, error: response.statusText}
        }

        }catch(e:any){
            return {success:false, error: e.toString()}
        }
       
    }
  
    


}