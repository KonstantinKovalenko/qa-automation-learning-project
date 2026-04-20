import { $, $$, browser, expect } from '@wdio/globals'

class SauceCheckoutPg {
    get #firstname () {return $('#first-name')}
    get #lastname () {return $('#last-name')}
    get #postalCode () {return $('#postal-code')}

    get #continueBtn () {return $('#continue')}
    get #finishBtn () {return $('#finish')}

    get #congratsHeader () {return $('#checkout_complete_container h2')}
    get #errorMessage () {return $('[class="error-message-container error"]')}

    async fillPersonalInfo (firstname: string, lastname: string, postalcode: string){
        await this.#firstname.setValue(firstname)
        await this.#lastname.setValue(lastname)
        await this.#postalCode.setValue(postalcode)
    }

    async clickOnContinueBtn(){
        await this.#continueBtn.click()
    }

    async clickOnFinishBtn(){
        await this.#finishBtn.click()
    }

    async assertCheckoutComplete(){
        await expect(this.#congratsHeader).toHaveText('Thank you for your order!')
    }

    async assertErrorShown(){
        await expect(this.#errorMessage).toExist()
    }
}
export default new SauceCheckoutPg()