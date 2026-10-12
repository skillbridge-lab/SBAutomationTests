//Camel Case

// I Love India -> iLoveIndia
//Class - pascal case -I

//How do you manage test data?
//In our framework we are using json files to store the test data and that we are using it in 
//test scripts

//JSON - javascript object notation
/*
{
    name:'LoginBtn'
    user:"abc"
}

*/

//How do we use data from json
//1. import the json file
//2 use variable name to select specific key from json

//If you have one giant page then how will you manage?
// IF we have gient page then we can logically break the page into multiple sub pages. and accordingly
// we can store our locators and actions

//You have 100 pages in a application
//If we have 100 pages then we can logically group pages, we can merge two small pages in one file
//Then yes we need to create 100 pages but definitely I'll try to optimize the page numbers

//Any other design pattern you know?
// Yeah I heard about screenplay pattern, factory pattern but I never used them


//Page object manager
// In page object manager we create one class called pageobjectmanager where we initialize 
//all the page class objects and use it in test. so while using this it checks if object is already present
// if yes then it does not create new object
// if no then it creates new object
//ex 
//
// let loginPage = getPageObjectManager().getLoginPage();
// loginPage==null? new LoginPage(page) : loginPage
//  

//Drawback of POM
// Increate in page count increase the object, so object become difficult to manage. So org uses Page object manager
//Main drawaback I see is Some components will be same accross the pages, there are chances of creating duplicate locators
//duplicate action methods, so org use COM along with page object model, 
//and componant object manager - we create separate class for common headers, footers, models elements
// Model -> popup
// footer -> 
// Heder ->

//How do we manage the creds
//Local -> We encrypt the username and password using encryption utility
// and we store them in .env file, which we ignore in the git.
//and use those creds in our tests
 
//CICD - Secrete Managers/Security Vaults -> Secrete management service, aws secrets manager, vault
// First we encrypt creds and thenn We store our all our creds or secrets in security vault, 
// I mean we have portal where we store all our credentials
// And then by using api calls we retrieve our creds and use them in login or wherever required.

//dotenv library - used to manage environment variables
//1. npm install dotenv
//2. set path of env file in playwright config

//Encryption
//Password@123   ->  sjduhwyqwbsxha162535641263gavsghas56231276
//Decryption
//sjduhwyqwbsxha162535641263gavsghas56231276 -> Password@123

import {test, expect} from '@playwright/test';

//1 import page class
import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import {FundExporerPage} from '../pages/FundExporerPage';
import testData from '../data/NavTest.json';


test('Validate Portfolio Value In Dashboard', async({page}) => {
    await page.goto(process.env.url!);
    
    //2 Create Object of page class
    let loginPage = new LoginPage(page);

    //Call actions methods

    // let username = VaultUtility.getCreds('username');

    await loginPage.enterUserName(process.env.investor_username!);
    await loginPage.enterPassword(process.env.investor_password!);
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

test('Validate Asset Allocation In Dashboard', async({page}) => {
    await page.goto('https://deepakrao64.github.io/SB/MutualFundClient/FinVersePortal/index.html');
    
    let loginPage = new LoginPage(page);
    await loginPage.enterUserName("deepak");
    await loginPage.enterPassword("Password@123");
    await loginPage.clickOnSignInSecurely();

    await expect(page.getByText('Debt20%')).toBeVisible();
    await expect(page.getByText('Equity60%')).toBeVisible();
    await expect(page.getByText('Gold10%')).toBeVisible();
    await expect(page.getByText('Liquid10%')).toBeVisible();
});