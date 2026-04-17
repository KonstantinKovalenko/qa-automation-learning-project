import { $, $$, browser, expect } from '@wdio/globals'

class SauceCheckoutPg {
    get #firstname () {return $('#first-name')}
    get #lastname () {return $('#last-name')}
    get #postalCode () {return $('#postal-code')}

    get #continueBtn () {return $('#continue')}
    get #finishBtn () {return $('#finish')}

    get #congratsHeader () {return $('#checkout_complete_container h2')}
    get #errorMessage () {return $('[class="error-message-container error"]')}

    /** fill personal info by params */
    async fillPersonalInfo (firstname: string, lastname: string, postalcode: number){
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

    /** Check if checkout is complete */
    async isCheckoutComplete(){
        const expectedText = await this.#congratsHeader.getText()
        const realText = "Thank you for your order!"
        if(realText === expectedText){
            return true
        }
        return false
    }

    /** Check if error message is shown*/
    async isErrorShown(){
        const errorIsExisting = await this.#errorMessage.isExisting()
        if(errorIsExisting){
            return true
        }
        return false
    }
}
export default new SauceCheckoutPg()