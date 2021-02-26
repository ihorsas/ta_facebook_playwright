// import {step} from "ts-test-decorators";
// import {expect} from "chai"
// const step = require("ts-test-decorators");
import {BasePage} from "./BasePage"

export class MessagesPage extends BasePage {
    url = 'https://www.facebook.com/messages';

    searchChatInput = 'input[type="search"][aria-label~="Messenger"]';
    foundChatsLinks = '//*[@id]/div/a';
    inputNewMessage = "div[role='textbox']";
    sendMessages = "[data-testid=outgoing_message] div[dir]";
    messageMoreButton = "[role=menuitem][aria-haspopup][aria-label='More']";
    removeMessageButton = '[aria-label="Remove message"]';
    removeMessagePopupButton = '[aria-label="Remove"][role="button"]:has(span:text("Remove"))';

    // @step("Navigate to messages page")
    async navigateTo() {
        await this.page.goto(this.url);
        await expect(this.page).toHaveText("h1", "Chats");
        return this;
    }

    // @step((personName: string) => `Open chat with '${personName}' by search`)
    async openChatWithSearch(personName: string) {
        await this.page.fill(this.searchChatInput, personName);
        await this.page.waitForSelector(this.foundChatsLinks, {state: "visible", timeout: 30000})
        await this.page.click(this.foundChatsLinks);
        return this;
    }

    // @step((message: string) => `Send message '${message}'`)
    async sendMessage(message: string) {
        await this.page.fill(this.inputNewMessage, message);
        await this.page.keyboard.press('Enter');
        return this;
    }

    // @step((message: string) => `Remove message '${message}'`)
    async removeMessage(message: string) {
        await this.page.hover(this.sendMessages + ':text("' + message + '")');
        await this.page.click(this.messageMoreButton);
        await this.page.click(this.removeMessageButton);
        await this.page.click(this.removeMessagePopupButton)
        return this;
    }

    // @step((message: string) => `Verify message '${message}' send`)
    async verifyMessageSend(message: string) {2
        await expect(this.page).toHaveText(this.sendMessages, message);
        return this;
    }

    // @step((message: string) => `Verify message '${message}' removed`)
    async verifyMessageRemoved(message: string) {
        await expect(this.page).not.toHaveText(this.sendMessages, message);
        return this;
    }
}