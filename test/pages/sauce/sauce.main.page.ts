import { $, $$, browser, expect } from '@wdio/globals'

class SauceMainPg {
    get #itemsPricesArray () {return $$('.inventory_item_price')} 
    get #sortOptionsArray () {return $$('.product_sort_container option')}
    get #addToCartBtnsArray () {return $$('[class="btn btn_primary btn_small btn_inventory "]')}
    get #itemsCountArray () {return $$('.inventory_item')}

    get #cartLink () {return $('.shopping_cart_link')}
    get #cartBadge () {return $('.shopping_cart_badge')}
    get #itemList () {return $('.inventory_list')}

    /** Sort elements by 1-based index */
    async selectSortOptionByIndex (index: number){
        const optionsArray = await this.#sortOptionsArray
        const maxIndex = await optionsArray.length
        if(index < 1 || index > maxIndex){
            throw new Error (`sortItemsByPosition: index must be between 1 and ${maxIndex} inclusive, got ${index}`)
        }
        return optionsArray[index-1].click()
    }

    async assertSortedByPriceLowToHigh (){
        const pricesFloatArray = await this.#getFloatPricesArray()
        for(let i = 1; i < pricesFloatArray.length; i++){
            expect(pricesFloatArray[i]).toBeGreaterThanOrEqual(pricesFloatArray[i-1])
        }
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

    async addAllItemsToCart () {
        const addBtnsArray = await this.#addToCartBtnsArray
        const checkNull = await addBtnsArray.length
        if (checkNull === 0){
            throw new Error ('No buttons found or page was not loaded')
        }
        for (const el of addBtnsArray){
            await el.click()
        }
    }

    async addRandomItemToCart (){
        const btnsArray = await this.#addToCartBtnsArray
        const btnsAmount = await btnsArray.length
        if(btnsAmount != 0){
            const randomIndex = this.#getRandomIndex(btnsAmount)
            await btnsArray[randomIndex].click()
        }
        
    }

    #getRandomIndex (max: number){
        const seed = process.env.SEED ? Number(process.env.SEED) : Date.now()
        console.log("Seed: ", seed)
        const x = Math.sin(seed)*10000
        return Math.floor((x - Math.floor(x)) * max)
    }

    async assertCartIsNotEmpty (){
        await expect(this.#cartBadge).toExist()
     }


    async openCart (){
        await this.#cartLink.click()
    }

    async waitForInventoryPageLoaded(){
        await browser.waitUntil(async () => {return (await this.#itemList).isDisplayed()},{timeout: 2000, timeoutMsg: "DOM was not loaded"})
    }

    async assertMainPgOpened (){
        await expect(this.#itemList).toBeDisplayed()
    }

    async getAvailableItemsCount () {
        const itemsCount = await this.#itemsCountArray.length
        return itemsCount
    }
}
export default new SauceMainPg()
