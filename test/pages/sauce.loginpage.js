class SauceLoginPage {
    get usernameInput () {return $('#user-name')}
    get passwordInput () {return $('#password')}

    get loginBtn () {return $('#login-button')}

    get cartLink () {return $('.shopping_cart_link')}

    get cartBadge () {return $('.shopping_cart_badge')}

    get captionsArray () {return $$('.inventory_item_name')}
    get cartItemsArray () {return $$('.cart_item')}
    get addToCartBtnsArray () {return $$('[class ="btn btn_primary btn_small btn_inventory "]')}
    get removeItemBtnsArray () {return $$('[class ="btn btn_secondary btn_small cart_button"]')}
    get itemsPricesArray () {return $$('.inventory_item_price')}

    async clickOnLoginBtn (){
        await this.loginBtn.click()
    }

    async inputCredentials (username, password){
        await this.usernameInput.addValue(username)
        await this.passwordInput.addValue(password)
    }

    async addFirstItemToCart (){
        let array = await this.addToCartBtnsArray
        await array[0].click()
    }

    async addThreeItemsToCart (){
        let array = await this.addToCartBtnsArray
        for (let i = 0; i < 3; i++){
            if(array.length > 0){
                await array[i].click()
            }
        }
    }

    async openLoginPage (){
        await browser.url('https://www.saucedemo.com/')
    }

    async openMainPage (){
        await browser.url('https://www.saucedemo.com/inventory.html')
    }

    async openCart (){
        await this.cartLink.click()
    }

    async getCartBadgeNumberAsText(){
        return await this.cartBadge.getText()
    }

    async removeAllItemsFromCart(){
        const array = await this.removeItemBtnsArray
        for (const el of array){
            await el.click()
        }
    }

    async checkAllPricesAreDisplayed(){
        const array = await this.itemsPricesArray
        for(const el of array){
            const priceText = await el.getText()
            if(await el.isDisplayed()){
                const checkPrice = parseFloat(priceText.match(/\d+(\.\d+)?/)[0])
                expect(checkPrice).toBeGreaterThan(0)
            }
        }
    }
}
export default new SauceLoginPage()