import { browser, expect } from '@wdio/globals'

describe('ChatGPT generated trainee tests for knowledge consolidation', () => {
    it('Should log in correctly (example 1)', async () => {
        await browser.url('https://www.saucedemo.com/')

        let usernameInput = await $('#user-name')
        let passwordInput = await $('#password')
        const loginButton = await $('#login-button')

        await usernameInput.setValue('standard_user')
        await passwordInput.setValue('secret_sauce')

        await loginButton.click()

        const currentURL = await browser.getUrl()
        expect(currentURL).toBe('https://www.saucedemo.com/inventory.html')
    })

    it('Should show error when credentials are incorrect (example 2)', async () => {
        await browser.url('https://www.saucedemo.com/')

        let usernameInput = await $('#user-name')
        let passwordInput = await $('#password')
        const loginButton = await $('#login-button')

        await usernameInput.setValue('standard_user')
        await passwordInput.setValue('secret_sauSe')

        await loginButton.click()

        const errorMessage = await $('[class="error-message-container error"]')
        expect (await errorMessage.isDisplayed()).toBe(true)
    })

    it('Should show page title when logged in (example 3)', async () => {
        await browser.url('https://www.saucedemo.com/')

        let usernameInput = await $('#user-name')
        let passwordInput = await $('#password')
        const loginButton = await $('#login-button')
        await usernameInput.setValue('standard_user')
        await passwordInput.setValue('secret_sauce')
        await loginButton.click()

        const welcomeCaption = await $('.app_logo')
        expect(await welcomeCaption.getText()).toBe('Swag Labs')
    })

    it('Should count shown products on page (example 4)', async () => {
        await browser.url('https://www.saucedemo.com/')

        let usernameInput = await $('#user-name')
        let passwordInput = await $('#password')
        const loginButton = await $('#login-button')
        await usernameInput.setValue('standard_user')
        await passwordInput.setValue('secret_sauce')
        await loginButton.click()

        let productShown = await $$('.inventory_item')
        expect(await productShown.length).toBe(6)
    })

    it('Should show product page after click (example 5)', async () => {
        await browser.url('https://www.saucedemo.com/')

        let usernameInput = await $('#user-name')
        let passwordInput = await $('#password')
        const loginButton = await $('#login-button')
        await usernameInput.setValue('standard_user')
        await passwordInput.setValue('secret_sauce')
        await loginButton.click()

        let productShown = await $$('.inventory_item_name')
        await productShown[0].click()

        const currentURL = await browser.getUrl()
        expect(currentURL).toHaveText('/inventory-item.html?id=')
    })
})

/* Сгенерировалл задание в ChatGPT для консолидации знаний и использовании в резюме
TRAINEE (база, освоение WebdriverIO)
👉 цель: научиться локаторам, кликам, expect
.inventory_item
1️⃣ Логин (успешный)
открыть сайт
ввести:
username: standard_user
password: secret_sauce
нажать login
проверить, что открылся каталог
2️⃣ Логин (негативный)
ввести неправильный пароль
проверить сообщение об ошибке
3️⃣ Проверка заголовка страницы
проверить title страницы после логина
4️⃣ Проверка количества товаров
получить список товаров
проверить, что их 6
5️⃣ Клик по товару
кликнуть по первому товару
проверить, что открылась страница товара */