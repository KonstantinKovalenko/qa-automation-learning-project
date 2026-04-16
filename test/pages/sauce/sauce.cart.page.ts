import { $, $$, browser, expect } from '@wdio/globals'

class SauceCartPg {
    get cartItemsArray () {return $$('.cart_item')}
    get removeItemBtnsArray () {return $$('[class ="btn btn_secondary btn_small cart_button"]')}

    async removeAllItemsFromCart(){
        const array = await this.removeItemBtnsArray
        for (const el of array){
            await el.click()
        }
    }
}
export default new SauceCartPg()