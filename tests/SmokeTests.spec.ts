import {test} from '@playwright/test';
import { ABC } from '../pages/ABC';


test('Test1', async({page}) => {
    await page.goto('abc.com');
    let abc = new ABC(page);
    abc.clickOnFundExplorer();
})


test('Test2', async({page}) => {
    await page.goto('abc.com');
    let abc = new ABC(page);
    abc.clickOnFundExplorer();
})

test('Test3', async({page}) => {
    await page.goto('abc.com');
    let abc = new ABC(page);
    abc.clickOnFundExplorer();
})
