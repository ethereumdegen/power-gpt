
 

    import { Configuration, OpenAIApi } from 'openai'



export interface QueryInput {

    model?:string,
    prompt:string 

}

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


        const response = await this.instance.createCompletion({
                model: input.model ? input.model :  "text-davinci-003",
                prompt: input.prompt,
                temperature: 0,
                max_tokens: 70,
        });

        if(response.status == 200){
            return {success:true, data: response.data}
        }else{
            return {success:false, error: response.statusText}
        }

       
    

    }
  
    


}