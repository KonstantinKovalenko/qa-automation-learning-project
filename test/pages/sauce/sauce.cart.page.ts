import { $, $$, browser, expect } from '@wdio/globals'

class SauceCartPg {
    get #cartItemsArray () {return $$('.cart_item')}

    get #checkoutBtn () {return $('#checkout')}

    async clickOnCheckoutBtn (){
        await this.#checkoutBtn.click()
    }

    async assertCartIsNotEmpty(){
        expect(await this.#cartItemsArray.length).toBeGreaterThan(0)
    }

    async assertCartIsFull (expected: number){
        expect(await this.#cartItemsArray.length).toBe(expected)
    }
}
export default new SauceCartPg()