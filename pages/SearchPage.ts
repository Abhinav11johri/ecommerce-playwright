
import { Page, expect } from '@playwright/test';

export class SearchPage{
constructor(private page: Page) {}

// Locators
    resultsList = () => this.page.locator('[data-component-type="s-search-result"]');
    firstProduct = () => this.resultsList().first();

// steps 

    async verifyResultsVisible() {
        await expect (this.firstProduct()).toBeVisible(); 
    }
    async getResultsCount()
    {
        return await this.resultsList().count();
    }


}
