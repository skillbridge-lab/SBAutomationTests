import { Page, Locator, expect } from "@playwright/test";

export class FundExporerPage {

    page:Page;
    nav:Locator;
    navOnDetailsPage:Locator;

    constructor(page:Page) {
        this.page = page;
        this.nav = page.locator("//span[text()='Parag Parikh Flexi Cap Fund']/parent::td/following-sibling::td[3]");
        this.navOnDetailsPage = page.locator("//span[text()='NAV']/following-sibling::strong");
    }

    async getNavFromTable() : Promise<string> {
       return await this.nav.innerText();
    }

    async clickOnRow() {
       await this.nav.click();
    }

    async getNavFromDetails()  : Promise<string> {
        return await this.navOnDetailsPage.innerText();
    }

    async verifyNavSameAccross() {
        let actualNAV = this.getNavFromTable();
        this.clickOnRow();
        let expectedNAV = this.getNavFromDetails();
        expect(actualNAV).toBe(expectedNAV);
    }
}