// import {step} from "ts-test-decorators";
// import {expect} from "chai"
import {BasePage} from "./BasePage"
import "expect-playwright"

export class WelcomePage extends BasePage {
    url = 'https://www.facebook.com/?sk=welcome';

    // @step('Navigate to login page')
    async navigateTo() {
        await this.page.goto(this.url);
        await expect(this.page).toHaveText("Welcome to Facebook");
        return this;
    }

    // @step("Verify welcome page is opened")
    async verifyPageOpened() {
        await this.page.waitForTimeout(2500)
        // await this.page.waitForLoadState('load')
        // await this.page.waitForLoadState('networkidle')
        // await this.page.waitForLoadState('domcontentloaded')
        // await this.page.waitForRequest( /.*welcome.*/);
        // await this.page.waitForNavigation({url: this.url,waitUntil: 'domcontentloaded'});
        await expect(this.page.url()).toContain(this.url);
        await expect(this.page).toHaveText("Welcome to Facebook");
        return this;
    }

}