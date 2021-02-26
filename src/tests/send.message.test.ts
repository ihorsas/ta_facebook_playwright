
import {Browser, BrowserContext, Page} from "playwright";
import {closeBrowser, startBrowser} from "../utils/browserUtils";

import {LoginPage} from '../pages/LoginPage'
import {WelcomePage} from "../pages/WelcomePage";
import {MessagesPage} from "../pages/MessagesPage";

import {Reporter, Severity} from 'jest-allure/dist/Reporter';

declare let reporter: Reporter;

describe("Send message and remove test", () => {

    const message = "Start working, lazy pig!";
    const username = "groot.epam@gmail.com";
    const password =  "iamgroot";
    let bcpObj: {browser: Browser, context: BrowserContext, page: Page};

    beforeAll(async () => {
        // @ts-ignore
        // decorate<MochaAllure>(allure);
    })

    beforeEach(async () => {
        bcpObj = await startBrowser("firefox", false);
        bcpObj.page.setDefaultTimeout(25*1000)
        bcpObj.page.setDefaultNavigationTimeout(25*1000)
    })

    afterEach(async () => {
        reporter.addAttachment("Screenshot", bcpObj.page.screenshot(), 'image/png')
        await closeBrowser(bcpObj);
    })

    it("Send message test", async () => {

        await new LoginPage(bcpObj.page, reporter).navigateTo()
            .then(async (p: LoginPage) => await p.login(username, password))
            .then(async (p: WelcomePage) => await p.verifyPageOpened());

        await new MessagesPage(bcpObj.page, reporter).navigateTo()
            .then(async (p: MessagesPage) => await p.openChatWithSearch("Peter Kwasnijewski"))
            .then(async (p: MessagesPage) => await p.sendMessage(message))
            .then(async (p: MessagesPage) => await p.verifyMessageSend(message));
    });

    it("Remove message test", async () => {
        await new LoginPage(bcpObj.page, reporter).navigateTo()
            .then(async (p: LoginPage) => await p.login(username, password))
            .then(async (p: WelcomePage) => await p.verifyPageOpened());

        await new MessagesPage(bcpObj.page, reporter).navigateTo()
            .then(async (p: MessagesPage) => await p.openChatWithSearch("Peter Kwasnijewski"))
            .then(async (p: MessagesPage) => await p.removeMessage(message))
            .then(async (p: MessagesPage) => await p.verifyMessageRemoved(message));
    })

})