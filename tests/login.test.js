const {LoginPage} = require('../pages/LoginPage.js')
const { webkit } = require('playwright');

jest.setTimeout(40 * 1000)

describe("Login test", () => {

    let browser, context, page;

    beforeEach(async () => {
        browser = await webkit.launch({headless: false, slowMo: 50});
        context = await browser.newContext();
        page = await context.newPage();
    });

    it("Log in to facebook test", async () => {
        //Show all network during the test
        await page.route('https://www.facebook.com/**', route => {
            console.log(route.request().url());
            route.continue();
        });
        //Navigate to login page
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        //Log in to facebook
        await loginPage.login('groot.epam@gmail.com', 'iamgroot')
        //Verify user logged in and welcome page opened
        await page.waitForNavigation ({timeout: 10000, url: 'https://www.facebook.com/?sk=welcome', waitUntil: 'domcontentloaded'});
        await expect(page.url()).toMatch('https://www.facebook.com/?sk=welcome')
    })

    afterEach( async () => {
        await browser.close();
    })

})