class LoginPage {
    emailInput = '#email';
    passwordInput = '#pass';
    loginButton = '[name="login"]';

    constructor(page) {
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto('https://facebook.com');
        await expect(this.page).toEqualText("h2", "Connect with friends and the world around you on Facebook.")
        return this;
    }

    async login(email, password) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
        return this;
    }
}

module.exports = { LoginPage };
