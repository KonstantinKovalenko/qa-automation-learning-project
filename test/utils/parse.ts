   import { ChainablePromiseArray } from 'webdriverio'
   
    export async function extractNumbersFromElements (array: ChainablePromiseArray){
        const inputArray = await array
        const resultArray = []
        for(const el of inputArray){
            const priceText = await el.getText()
            const checkPrice = priceText.match(/\d+(\.\d+)?/)
            if(!checkPrice){
                throw new Error (`No price found in ${priceText}`)
            }
            resultArray.push(parseFloat(checkPrice[0]))
        }
        return resultArray
    }
