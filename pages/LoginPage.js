const {BasePage} = require('../pages/BasePage.js')

class LoginPage extends BasePage{
   url = 'https://www.facebook.com';

    emailInput = '#email';
    passwordInput = '#pass';
    loginButton = '[name="login"]';

    async navigateTo() {
        await global.allure.step('Navigate to login page', async () => {
            await this.page.goto(this.url);
            await expect(this.page).toEqualText("h2", "Connect with friends and the world around you on Facebook.")
            return this;
        })
    }

    async login(email, password) {
        await global.allure.step(`Log in to facebook with email '${email}' and password '${password}'`, async () => {
            await this.page.fill(this.emailInput, email);
            await this.page.fill(this.passwordInput, password);
            await this.page.click(this.loginButton);
            return this;
        })
    }
}

module.exports = { LoginPage };
