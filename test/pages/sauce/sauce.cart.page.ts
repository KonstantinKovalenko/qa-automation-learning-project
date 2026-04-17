import { $, $$, browser, expect } from '@wdio/globals'

class SauceCartPg {
    get #cartItemsArray () {return $$('.cart_item')}

    get #checkoutBtn () {return $('#checkout')}

    async clickOnCheckoutBtn (){
        await this.#checkoutBtn.click()
    }

    /** Should check if cart is empty */
    async isCartEmpty(){
        const itemsArray = await this.#cartItemsArray
        const arrayLength = await itemsArray.length
         if(arrayLength === 0){
            return true
        }
        return false
    }
}
export default new SauceCartPg()