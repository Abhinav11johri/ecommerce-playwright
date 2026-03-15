import { test, expect } from '../fixtures/baseTest'; // Import your custom test fixture
import testData from '../config/testData.json'; // Import your JSON data

test.describe('Amazon Search Functionality', () => {

    test('Should search for a product and verify results', async ({ homePage, searchPage, page }) => {
        // Step 1: Navigate to the Base URL
        await homePage.goto(testData.baseUrl);
        
        // Step 2: Verify the title (Industry best practice before taking action)
        await expect(page).toHaveTitle(new RegExp(testData.expectedTitle));

        // Step 3: Search for the product using test data
        await homePage.searchForProduct(testData.searchTerm);
        
        // Note: In your HomePage.ts, searchForProduct clicks the search box. 
        // We press 'Enter' here to trigger the actual search submission.
        await page.keyboard.press('Enter'); 

        // Step 4: Verify search results are visible
        await searchPage.verifyResultsVisible();

        // Step 5: Validate minimum results count
        const resultsCount = await searchPage.getResultsCount();
        expect(resultsCount).toBeGreaterThanOrEqual(testData.minResults);
        
        console.log(`Successfully found ${resultsCount} results for ${testData.searchTerm}`);
    });

});