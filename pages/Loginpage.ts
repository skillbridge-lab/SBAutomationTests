
//Each Page - Separate Class
//Its locators
//Actions - each action we create one method

import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {

    page:Page;
    userName:Locator;
    password:Locator;
    signInSecurlyBtn:Locator;

    constructor(page:Page) {
        this.page = page;
        this.userName = page.getByTestId('login-username');
        this.password = page.getByTestId('login-password');
        this.signInSecurlyBtn = page.getByTestId('login-button');
    }

    async enterUserName(username:string) {
        await this.userName.fill(username);
    }

    async enterPassword(passWord:string) {
        await this.password.fill(passWord);
    }

    async clickOnSignInSecurely() {
        await this.signInSecurlyBtn.click();
    }
}



// export class LoginPage {

//     name:String;   //Skill Bridge

//     constructor(name:String) {  ///name= Skill Bridge
//         this.name = name;
//     }

//     async printSomething() {
//         console.log('Soemthing Something');
//     }

//     async printName() {
//         console.log(this.name);
//     }     
// }



