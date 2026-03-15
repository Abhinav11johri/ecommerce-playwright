import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    // locator
    searchBox = () => this.page.locator('#twotabsearchtextbox');
    searchBtn = () => this.page.locator('#nav-search-submit-button');

    //steps

    async goto(url: string){
        await this.page.goto(url);
    }

    async searchForProduct(item: string) {
        await this.searchBox().fill(item);
        await this.searchBtn().click();
    }
}


