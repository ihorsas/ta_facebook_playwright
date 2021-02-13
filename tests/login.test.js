const {LoginPage} = require('../pages/LoginPage.js')
const {WelcomePage} = require('../pages/WelcomePage.js')

jest.setTimeout(40 * 1000)

describe("Login test", () => {

    it("Log in to facebook test", async () => {
        const loginPage = new LoginPage(global.page);
        const welcomePage = new WelcomePage(global.page);
        await loginPage.navigateTo();
        await loginPage.login('groot.epam@gmail.com', 'iamgroot')
        await welcomePage.verifyPageOpened();
    })

    afterEach( async () => {
        await page.close();
    })

})