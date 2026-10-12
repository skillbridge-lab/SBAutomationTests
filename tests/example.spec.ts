import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FundExporerPage } from '../pages/FundExporerPage';


//
//Page Object Model
// Page object model is a design pattern where we create separate class for each and every webpage present in the applciation
// which holds its locators and actions

test('Validate Asset Allocation In Dashboard', async({page}) => {
    await page.goto('https://deepakrao64.github.io/SB/MutualFundClient/FinVersePortal/index.html');
    
    let loginPage = new LoginPage(page);
    await loginPage.enterUserName("deepak");
    // await loginPage.enterPassword(testData.password);
    await loginPage.clickOnSignInSecurely();
    
    let dashBoardPage = new DashboardPage(page);
    await dashBoardPage.validateWelComeheaderDisplayed();
    await dashBoardPage.validatePortfolioValueCardDisplayed();
    await dashBoardPage.printInvestedAmount();
    await dashBoardPage.clickOnFundExplorer();

    let fundExporerPage = new FundExporerPage(page);
    let expectedNAV = await fundExporerPage.getNavFromTable();
    await fundExporerPage.clickOnRow();
    let actualNAV = await fundExporerPage.getNavFromDetails();
    expect(expectedNAV).toBe(actualNAV);
});
