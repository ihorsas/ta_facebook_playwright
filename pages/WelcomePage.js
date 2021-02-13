const {BasePage} = require('../pages/BasePage.js')

class WelcomePage extends BasePage {
    url = 'https://www.facebook.com/?sk=welcome';

    async navigateTo() {
        await global.allure.step('Navigate to login page', async () => {
            await this.page.goto(this.url);
            await expect(this.page).toHaveText("Welcome to Facebook")
            return this;
        })
    }

    async verifyPageOpened() {
        await page.waitForNavigation ({timeout: 10000, url: this.url, waitUntil: 'domcontentloaded'});
        await expect(page.url()).toMatch(this.url);
        await expect(this.page).toHaveText("Welcome to Facebook")
    }

}

module.exports = { WelcomePage };
