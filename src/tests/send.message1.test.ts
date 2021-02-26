import {suite, test} from '@testdeck/jest';
import {Hooks} from './hooks';
import {LoginPage} from "../pages/LoginPage";
import {WelcomePage} from "../pages/WelcomePage";
import {MessagesPage} from "../pages/MessagesPage";

@suite
class Suite2 extends Hooks {
  message = "Start working, lazy pig!";
  username = "groot.epam@gmail.com";
  password = "iamgroot";

  @test
  async "Send message test"() {
    await new LoginPage(this.bcpObj.page).navigateTo()
      .then(async (p: LoginPage) => await p.login(this.username, this.password))
      .then(async (p: WelcomePage) => await p.verifyPageOpened());

    await new MessagesPage(this.bcpObj.page).navigateTo()
      .then(async (p: MessagesPage) => await p.openChatWithSearch("Peter Kwasnijewski"))
      .then(async (p: MessagesPage) => await p.sendMessage(this.message))
      .then(async (p: MessagesPage) => await p.verifyMessageSend(this.message));
  }

  @test
  async "Remove message test"() {
    await new LoginPage(this.bcpObj.page).navigateTo()
      .then(async (p: LoginPage) => await p.login(this.username, this.password))
      .then(async (p: WelcomePage) => await p.verifyPageOpened());

    await new MessagesPage(this.bcpObj.page).navigateTo()
      .then(async (p: MessagesPage) => await p.openChatWithSearch("Peter Kwasnijewski"))
      .then(async (p: MessagesPage) => await p.removeMessage(this.message))
      .then(async (p: MessagesPage) => await p.verifyMessageRemoved(this.message));
  }

}
