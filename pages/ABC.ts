import { Page, expect, Locator } from "@playwright/test";

export class ABC {

    page:Page;
    welcomheader:Locator;
    portfolioValue:Locator;
    investedAmount:Locator;
    fundExporerTab:Locator;

     constructor(page:Page) {
        this.page = page;
        this.welcomheader = page.getByRole('heading', { name: 'Welcome Back, deepak' });
        this.portfolioValue = page.getByTestId('portfolio-value-card').getByText('Portfolio Value');
        this.investedAmount = page.getByTestId('invested-amount-card').locator('[class="card-value"]');
        this.fundExporerTab = page.getByRole('link', {name:'Fund Explorer'});

    }

    async validateWelComeheaderDisplayed() {
        await expect(this.welcomheader).toBeVisible();
    }

    async validatePortfolioValueCardDisplayed() {
        await expect(this.portfolioValue).toBeVisible();
    }

    async printInvestedAmount() {
        console.log(await this.investedAmount.innerText());
    }

    async clickOnFundExplorer() {
        await this.fundExporerTab.click();
    }
}