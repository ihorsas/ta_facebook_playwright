import {chromium, webkit, firefox, Page, Browser, BrowserContext} from "playwright";
import {Reporter} from "jest-allure/dist/Reporter";

let currentPage: Page;

export async function startBrowser(browserName: "chromium"|"webkit"|"firefox", headless: boolean) {
    let browser = await {chromium, webkit, firefox}[browserName].launch({
        headless: headless, slowMo: 50
    });
    let context = await browser.newContext({
        recordVideo: {dir: 'result/videos/'},
        locale: 'en_US',
    })
    let page = await context.newPage();
    currentPage = page;
    return {browser: browser, context: context, page: page};
}

export async function closeBrowser(browserContextPageObject:
                                       {browser: Browser, context: BrowserContext, page: Page}) {
    await browserContextPageObject.page.close();
    await browserContextPageObject.context.close();
    await browserContextPageObject.browser.close();
}

export async function getCurrentPage() {
    return currentPage;
}

