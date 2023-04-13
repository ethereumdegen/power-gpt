import { expect, should } from 'chai'

import {createCompletion} from "../lib/openai-lib"

describe('Power GPT', () => {
 
    before(async () => {
  
 
    })
  
    after(async () => {
  
      
    
    })
    
    
    it('can perform completion ', async () => {
  
    
        let response = await createCompletion({

            model: 'gpt-3.5-turbo',
            prompt: 'test prompt',
        

        })

        console.log(JSON.stringify(response))
    })

})