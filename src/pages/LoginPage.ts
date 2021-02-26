import {step} from '../../config/jest-custom-reporter';

import {BasePage} from "./BasePage"
import {WelcomePage} from "./WelcomePage";

export class LoginPage extends BasePage {
  url = 'https://www.facebook.com';

  emailInput = '#email';
  passwordInput = '#pass';
  loginButton = '[name="login"]';

  @step("Navigate to login page")
  async navigateTo() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveText("Connect with friends and the world around you on Facebook.");
    return this;
  }

  @step(((arg: string) => `Log in to facebook with email '${arg}' and password '${arg}'`))
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    return new WelcomePage(this.page);
  }
}
