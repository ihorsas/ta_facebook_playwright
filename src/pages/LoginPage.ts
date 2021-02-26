// import {expect} from "chai"
import {BasePage} from "./BasePage"
import {WelcomePage} from "./WelcomePage";
import { step } from "ts-test-decorators";

export class LoginPage extends BasePage {
    url = 'https://www.facebook.com';

    emailInput = '#email';
    passwordInput = '#pass';
    loginButton = '[name="login"]';

    // @step("Navigate to login page")
    async navigateTo() {
        this.reporter.startStep("Navigate to login page");
        await this.page.goto(this.url);
        await expect(this.page).toHaveText("Connect with friends and the world around you on Facebook.");
        this.reporter.endStep();
        return this;
    }
    //, password: string
    // @step((email: string) => `Log in to facebook with email '${email}' and password '${email}'`)
    async login(email: string, password: string) {
        this.reporter.startStep(`Log in to facebook with email '${email}' and password '${password}'`);
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
        this.reporter.endStep();
        return new WelcomePage(this.page, this.reporter);
    }
}