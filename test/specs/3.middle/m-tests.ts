import { browser, expect } from '@wdio/globals'
import SauceLoginPg from "../../pages/sauce/sauce.login.page"
import SauceMainPg from "../../pages/sauce/sauce.main.page"
import SauceCartPage from '../../pages/sauce/sauce.cart.page'
import SauceCheckoutPage from '../../pages/sauce/sauce.checkout.page'

describe('ChatGPT generated middle level tests for knowledge consolidation', () => {
    const username = "standard_user"
    const password = "secret_sauce"

    xit('Should sort items (task 1)', async () => {
        await SauceLoginPg.openLoginPage()
        await SauceLoginPg.loginByCredentials(username, password)

        await SauceMainPg.sortItemsByPosition(3)
        expect(await SauceMainPg.areItemsSortedByPriceLTH()).toBe(true)
    })

    xit('Should test checkout (task 2, smoke)', async () => {
        await SauceLoginPg.openLoginPage()
        await SauceLoginPg.loginByCredentials(username, password)

        await SauceMainPg.addOneRandomItemToCart()
        await SauceMainPg.openCart()

        await SauceCartPage.clickOnCheckoutBtn()

        await SauceCheckoutPage.fillPersonalInfo("name","last name", 50000)
        await SauceCheckoutPage.clickOnContinueBtn()
        await SauceCheckoutPage.clickOnFinishBtn()

        expect(await SauceCheckoutPage.isCheckoutComplete()).toBe(true)
    })

    xit('Should test cart condition after refresh (task 3)', async () => {
        await SauceLoginPg.openLoginPage()
        await SauceLoginPg.loginByCredentials(username, password)

        await SauceMainPg.addOneRandomItemToCart()

        await browser.refresh()
        await SauceMainPg.waitUntilDomIsLoaded()

        await SauceMainPg.openCart()
        expect(await SauceCartPage.isCartEmpty()).toBe(false)
    })

    it('Should validate personal info data (task 4, negative)', async () => {
        await SauceLoginPg.openLoginPage()
        await SauceLoginPg.loginByCredentials(username, password)

        await SauceMainPg.addOneRandomItemToCart()
        await SauceMainPg.openCart()
        await SauceCartPage.clickOnCheckoutBtn()

        await SauceCheckoutPage.clickOnContinueBtn()
        expect(await SauceCheckoutPage.isErrorShown()).toBe(true)
    })
})

/* Сгенерировалл задание в ChatGPT для консолидации знаний и использовании в резюме
MIDDLE (архитектура, Page Object, сложная логика)
👉 цель: думать как QA automation engineer

1️⃣ Сортировка товаров
выбрать сортировку “Price (low to high)”
проверить, что список отсортирован
2️⃣ Проверка полного checkout
логин
добавить товар
перейти в корзину
оформить заказ
проверить успешное сообщение
3️⃣ Проверка сохранения состояния
добавить товар
обновить страницу
проверить, что товар остался в корзине
4️⃣ Валидация формы checkout
перейти к оформлению
не заполнять поля
проверить наличие ошибки
5️⃣ Проверка всех кнопок Add to cart
пройтись циклом по всем товарам
нажать “Add to cart”
проверить, что все добавились */