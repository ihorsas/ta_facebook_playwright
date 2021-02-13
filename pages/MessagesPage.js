const {BasePage} = require('../pages/BasePage.js')

class MessagesPage extends BasePage {
    url = 'https://www.facebook.com/messages';

    searchChatInput = 'input[type="search"][aria-label~="Messenger"]';
    foundChatsLinks = '//*[@id]/div/a';
    inputNewMessage = "div[role='textbox']";
    sendMessages = "[data-testid=outgoing_message] div[dir]";
    messageMoreButton = "[role=menuitem][aria-haspopup][aria-label='More']";
    removeMessageButton = '[aria-label="Remove message"]';
    removeMessagePopupButton = '[aria-label="Remove"][role="button"]:has(span:text("Remove"))';

    async navigateTo() {
        await global.allure.step('Navigate to messages page', async () => {
            await this.page.goto(this.url);
            await expect(this.page).toEqualText("h1", "Chats")
            return this;
        });
    }

    async openChatWithSearch(personName) {
        await global.allure.step(`Open chat with '${personName}' by search`, async () => {
            await this.page.fill(this.searchChatInput, personName);
            await expect(this.page).toHaveSelector(this.foundChatsLinks, {state: "visible", timeout: 30000});
            await this.page.click(this.foundChatsLinks);
            return this;
        });
    }

    async sendMessage(message) {
        await global.allure.step(`Send message '${message}'`, async () => {
            await this.page.fill(this.inputNewMessage, message);
            await this.page.keyboard.press('Enter');
            return this;
        });
    }

    async removeMessage(message) {
        await global.allure.step(`Remove message '${message}'`, async () => {
            await this.page.hover(this.sendMessages + ':text("' + message + '")');
            await this.page.click(this.messageMoreButton);
            await this.page.click(this.removeMessageButton);
            await this.page.click(this.removeMessagePopupButton)
            return this;
        })
    }

    async verifyMessageSend(message) {
        await global.allure.step(`Verify message '${message}' send`, async () => {
            await expect(this.page).toHaveText(this.sendMessages, message);
            return this;
        })
    }

    async verifyMessageRemoved(message) {
        await global.allure.step(`Verify message '${message}' removed`, async () => {
            await expect(this.page).not.toHaveText(this.sendMessage, message);
            return this;
        })
    }
}

module.exports = {MessagesPage};
