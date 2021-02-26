import {Page} from "playwright";
import {Reporter} from "jest-allure/dist/Reporter";

export class BasePage {
    protected page: Page;
    protected reporter: Reporter;

    constructor(page: Page, reporter: Reporter) {
        this.page = page;
        this.reporter = reporter;
    }
}