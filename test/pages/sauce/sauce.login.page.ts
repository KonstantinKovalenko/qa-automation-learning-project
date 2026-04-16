import { $, browser, expect } from '@wdio/globals'

class SauceLoginPg {
    #LOGIN_URL = "https://www.saucedemo.com/"

    get #usernameInput () {return $('#user-name')}
    get #passwordInput () {return $('#password')}
    get #loginBtn () {return $('#login-button')}

    /**opens https://www.saucedemo.com/ */
    async openLoginPage (){
        await browser.url(this.#LOGIN_URL)
    }

    /**
    * @param {string} username
    * @param {string} password
    */
     async loginByCredentials (username: string, password: string){
        await this.#usernameInput.setValue(username)
        await this.#passwordInput.setValue(password)
        await this.#loginBtn.click()

        await expect($('.inventory_container')).toBeDisplayed()
    }
}
export default new SauceLoginPg()