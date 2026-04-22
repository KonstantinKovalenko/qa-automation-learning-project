import { browser, expect } from '@wdio/globals'
import { getRandomIndex } from '../../utils/random'
import SauceLoginPg from "../../pages/sauce/sauce.login.page"
import SauceMainPg from "../../pages/sauce/sauce.main.page"
import SauceCartPage from '../../pages/sauce/sauce.cart.page'
import SauceCheckoutPage from '../../pages/sauce/sauce.checkout.page'
import { extractNumbersFromElements } from '../../utils/parse'

describe('ChatGPT generated middle level tests for knowledge consolidation', () => {
    const username = "standard_user"
    const password = "secret_sauce"

    beforeEach(async () => {
        await SauceLoginPg.openLoginPage()
        await SauceLoginPg.loginByCredentials(username, password)
        await SauceMainPg.assertMainPgOpened()
    })

    it('Should sort items (task 1)', async () => {
        await SauceMainPg.selectSortOptionByIndex(3)

        const elementsArray = await SauceMainPg.getItemPricesArray()
        const pricesArray = await extractNumbersFromElements(elementsArray)
        expect(await SauceMainPg.isSortedLowToHigh(pricesArray)).toBe(true)
    })

    it('Should test checkout (task 2, smoke)', async () => {
        const itemsCount = await SauceMainPg.getAvailableItemsCount()
        const randomItemIndex = getRandomIndex(itemsCount)
        await SauceMainPg.addItemByIndex(randomItemIndex)
        await SauceMainPg.openCart()

        await SauceCartPage.clickOnCheckoutBtn()

        await SauceCheckoutPage.fillPersonalInfo("name","last name", "50000")
        await SauceCheckoutPage.clickOnContinueBtn()
        await SauceCheckoutPage.clickOnFinishBtn()

        await SauceCheckoutPage.assertCheckoutComplete()
    })

    it('Should test cart condition after refresh (task 3)', async () => {
        const itemsCount = await SauceMainPg.getAvailableItemsCount()
        const randomItemIndex = getRandomIndex(itemsCount)
        await SauceMainPg.addItemByIndex(randomItemIndex)

        await browser.refresh()
        await SauceMainPg.waitForInventoryPageLoaded()

        await SauceMainPg.openCart()
        await SauceCartPage.assertCartIsNotEmpty()
    })

    it('Should validate personal info data (task 4, negative)', async () => {
        const itemsCount = await SauceMainPg.getAvailableItemsCount()
        const randomItemIndex = getRandomIndex(itemsCount)
        await SauceMainPg.addItemByIndex(randomItemIndex)

        await SauceMainPg.openCart()
        await SauceCartPage.clickOnCheckoutBtn()

        await SauceCheckoutPage.clickOnContinueBtn()
        await SauceCheckoutPage.assertErrorShown()
    })

    it('Should validate personal info data (task 5)', async () => {
        const expectedCount = await SauceMainPg.getAvailableItemsCount()
        await SauceMainPg.addAllItemsToCart()
        
        await SauceMainPg.assertCartIsNotEmpty()
        
        await SauceMainPg.openCart()
        await SauceCartPage.assertCartIsFull(expectedCount)
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