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
            throw new Error (`selectSortOptionByIndex: index must be between 1 and ${maxIndex} inclusive, got ${index}`)
        }
        return optionsArray[index-1].click()
    }

    async isSortedLowToHigh (array: number[]){
        for(let i = 1; i < array.length; i++){
            if(array[i] < array[i-1]){
                return false
            }
        }
        return true
    }

    async getItemPricesArray () {
        return await this.#itemsPricesArray
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

    async addItemByIndex (index: number){
        const btnsArray = await this.#addToCartBtnsArray
        const btnsAmount = await btnsArray.length
        if(btnsAmount != 0){
            await btnsArray[index].click()
        }
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
