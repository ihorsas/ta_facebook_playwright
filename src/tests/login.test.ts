import {suite, test} from '@testdeck/jest';
import {Hooks} from './hooks';
import {LoginPage} from "../pages/LoginPage";
import {WelcomePage} from "../pages/WelcomePage";

@suite
class Suite1 extends Hooks {
  @test
  async "Log in to facebook test"() {
    await new LoginPage(this.bcpObj.page).navigateTo()
      .then(async (p: LoginPage) => await p.login('groot.epam@gmail.com', 'iamgroot'))
      .then(async (p: WelcomePage) => await p.verifyPageOpened());
  }

}
