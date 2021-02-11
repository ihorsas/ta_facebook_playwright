class MessagesPage {
    searchChatInput = 'input[type="search"][aria-label~="Messenger"]';
    foundChatsLinks = '//*[@id]/div/a';
    inputNewMessage = "div[role='textbox']";
    sendMessages = "[data-testid=outgoing_message] div[dir]";
    messageMoreButton = "[role=menuitem][aria-haspopup][aria-label='More']";
    removeMessageButton = '[aria-label="Remove message"]';
    removeMessagePopupButton = '[aria-label="Remove"][role="button"]:has(span:text("Remove"))';

    constructor(page) {
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto('https://www.facebook.com/messages');
        return this;
    }

    async openChatWithSearch(personName) {
        await this.page.fill(this.searchChatInput, personName);
        await expect(this.page).toHaveSelector(this.foundChatsLinks, { state: "visible" , timeout: 30000});
        await this.page.click(this.foundChatsLinks);
        return this;
    }

    async sendMessage(message) {
        await this.page.fill(this.inputNewMessage, message);
        await this.page.keyboard.press('Enter');
        return this;
    }

    async removeMessage(message) {
        await this.page.hover(this.sendMessages + ':text("' + message + '")');
        await this.page.click(this.messageMoreButton);
        await this.page.click(this.removeMessageButton);
        await this.page.click(this.removeMessagePopupButton)
        return this;
    }

    async verifyMessageSend(message) {
        await expect(this.page).toHaveText(this.sendMessages, message);
    }

    async verifyMessageRemoved(message) {
        await expect(this.page).not.toHaveText(this.sendMessages, message);
    }
}

module.exports = { MessagesPage };
