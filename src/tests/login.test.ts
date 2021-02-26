import {Browser, BrowserContext, Page} from "playwright";
import {closeBrowser, startBrowser} from "../utils/browserUtils";

import {LoginPage} from "../pages/LoginPage";
import {WelcomePage} from "../pages/WelcomePage";

import {Reporter, Severity} from 'jest-allure/dist/Reporter';

declare let reporter: Reporter;

describe("Login test", () => {

    let bcpObj: {browser: Browser, context: BrowserContext, page: Page};

    beforeEach(async () => {
        // decorate<Allure>(allure)
        bcpObj = await startBrowser("firefox", false);
        bcpObj.page.setDefaultTimeout(25*1000)
        bcpObj.page.setDefaultNavigationTimeout(25*1000)
    })

    afterEach(async () => {
        // reporter.addAttachment("Screenshot", await bcpObj.page.screenshot(), 'image/png')
        await closeBrowser(bcpObj);
    })


    it("Log in to facebook test", async () => {
        reporter
            .description("Feature should not work cool")
            .severity(Severity.Critical)
            .story("BOND-007");

        await new LoginPage(bcpObj.page, reporter).navigateTo()
            .then(async (p: LoginPage) => await p.login('groot.epam@gmail.com', 'iamgroot'))
            .then(async (p: WelcomePage) => await p.verifyPageOpened());
    })

})