const {LoginPage} = require('../pages/LoginPage.js')
const {WelcomePage} = require('../pages/WelcomePage.js')
const {MessagesPage} = require('../pages/MessagesPage.js')

jest.setTimeout(40 * 1000)

describe("Send message and remove test", () => {

    const message = "Start working, lazy pig!";
    let loginPage, welcomePage, messagesPage;


    it("Send message test", async () => {
        loginPage = new LoginPage(global.page);
        welcomePage = new WelcomePage(global.page);
        messagesPage = new MessagesPage(global.page);

        await loginPage.navigateTo();
        await loginPage.login('groot.epam@gmail.com', 'iamgroot');
        await welcomePage.verifyPageOpened();
        await messagesPage.navigateTo();
        await messagesPage.openChatWithSearch("Peter Kwasnijewski");
        await messagesPage.sendMessage(message);
        await messagesPage.verifyMessageSend(message);
    });

    it("Remove message test", async () => {
        loginPage = new LoginPage(global.page);
        welcomePage = new WelcomePage(global.page);
        messagesPage = new MessagesPage(global.page);

        await loginPage.navigateTo();
        await loginPage.login('groot.epam@gmail.com', 'iamgroot');
        await welcomePage.verifyPageOpened();
        await messagesPage.navigateTo();
        await messagesPage.openChatWithSearch("Peter Kwasnijewski");
        await messagesPage.removeMessage(message);
        await messagesPage.verifyMessageRemoved(message);
    })

})