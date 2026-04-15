import { browser, expect } from '@wdio/globals'
import SauceLoginPage from '../../pages/sauce.loginpage'

describe('ChatGPT generated junior level tests for knowledge consolidation', () => {
    
    beforeEach(async () => {
        //cart wont clean after session out, i had to clean it manually to isolate test 2 and 3
        await SauceLoginPage.openLoginPage()
        await SauceLoginPage.inputCredentials('standard_user', 'secret_sauce')
        await SauceLoginPage.clickOnLoginBtn()

        await SauceLoginPage.openCart()
        await SauceLoginPage.removeAllItemsFromCart()
    })

    it('Should check headers of every product (task 1)', async () => {
        await SauceLoginPage.openMainPage()

        const captionsArray = await SauceLoginPage.captionsArray
        for (let i = 0; i < captionsArray.length; i++){
            const caption = await captionsArray[i].getText()
            expect(caption.length).toBeGreaterThan(0)
        }
    })

    it('Should add product to cart (task 2)', async () => {
        await SauceLoginPage.openMainPage()

        await SauceLoginPage.addFirstItemToCart()
        expect(await SauceLoginPage.getCartBadgeNumberAsText()).toBe('1')
    })

    it('Should add 3 products to cart (task 3)', async () => {
        await SauceLoginPage.openMainPage()

        await SauceLoginPage.addThreeItemsToCart()
        expect(await SauceLoginPage.getCartBadgeNumberAsText()).toBe('3')
    })

    it('Should remove product from cart (task 4)', async () => {
        await SauceLoginPage.openMainPage()

        await SauceLoginPage.addFirstItemToCart()
        await SauceLoginPage.openCart()
        await SauceLoginPage.removeAllItemsFromCart()

        await browser.waitUntil(async () => {return (await SauceLoginPage.cartItemsArray).length === 0})
    })

    it('Should check the prices (task 5)', async () => {
        await SauceLoginPage.openMainPage()

        await SauceLoginPage.checkAllPricesAreDisplayed()
    })
})

/* Сгенерировалл задание в ChatGPT для консолидации знаний и использовании в резюме
JUNIOR (логика, массивы, циклы)
👉 цель: работа с массивами, условиями, Page Object

1️⃣ Проверка названий товаров
получить все товары
проверить, что у каждого есть название
2️⃣ Добавление товара в корзину
добавить 1 товар
проверить, что иконка корзины = 1
3️⃣ Добавление нескольких товаров
добавить 3 товара
проверить счётчик корзины
4️⃣ Удаление товара
добавить товар
удалить его
проверить, что корзина пустая
5️⃣ Проверка цены
получить цены всех товаров
убедиться, что они отображаются и > 0 */