import { $, $$, browser, expect } from '@wdio/globals'

class SauceMainPg {
    get #itemsPricesArray () {return $$('.inventory_item_price')} 
    get #sortOptionsArray () {return $$('.product_sort_container option')}

    /** Sort elements by 1-based index, 0 < index < 5 */
    async sortItemsByPosition (index: number){
        const optionsArray = this.#sortOptionsArray
        const maxIndex = await optionsArray.length
        if(index < 1 || index > maxIndex){
            throw new Error (`sortItemsByPosition: index must be between 1 and ${maxIndex} inclusive, got ${index}`)
        }
        return optionsArray[index-1].click()
    }
    /**Check if items sorted by prise from low to high, return boolean */
    async areItemsSortedByPriceLTH (){
        const pricesFloatArray = await this.#getFloatPricesArray()
        for(let i = 0; i < pricesFloatArray.length; i++){
            if(i != 0){
                  if(pricesFloatArray[i] < pricesFloatArray[i-1]){
                    return false
                }
            }
        }
        return true
    }

    async #getFloatPricesArray (){
        const pricesArray = await this.#itemsPricesArray
        const resultArray = []
        for(const el of pricesArray){
            const priceText = await el.getText()
            const checkPrice = priceText.match(/\d+(\.\d+)?/)
            if(!checkPrice){
                throw new Error (`No price found in ${priceText}`)
            }
            resultArray.push(parseFloat(checkPrice[0]))
        }
        return resultArray
    }

}
export default new SauceMainPg()
