const {LoginPage} = require('../pages/LoginPage.js')
const {MessagesPage} = require('../pages/MessagesPage.js')
const { chromium } = require('playwright');

jest.setTimeout(40 * 10000)

describe("Send message and remove test", () => {

    const message = "Start working, lazy pig!";
    let browser, context, page;
    let loginPage, messagesPage;

    beforeAll(async () => {
        browser = await chromium.launch({headless: false, slowMo: 50});
        context = await browser.newContext();
        page = await context.newPage();
    });

    it("Send message test", async () => {
        await page.route('https://www.facebook.com/**', route => {
            console.log(route.request().url());
            route.continue();
        });
        //Log in to facebook
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.login('groot.epam@gmail.com', 'iamgroot')
        await page.waitForNavigation ({timeout: 10000, url: 'https://www.facebook.com/?sk=welcome', waitUntil: 'domcontentloaded'});
        await expect(page.url()).toMatch('https://www.facebook.com/?sk=welcome')
        //Open messages page"
        messagesPage = new MessagesPage(page);
        await messagesPage.navigateTo();
        await messagesPage.openChatWithSearch("Peter Kwasnijewski");
        await messagesPage.sendMessage(message);
        await messagesPage.verifyMessageSend(message);
    });

    it("Remove message test", async () => {
        await messagesPage.removeMessage(message);
        await messagesPage.verifyMessageRemoved(message);
    })


    afterAll( async () => {
        await browser.close();
    })

})