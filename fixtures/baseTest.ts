// fixtures/baseTest.ts
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

type MyFixtures = {
    homePage: HomePage;
    searchPage: SearchPage;
    autoScreenshot: void; // This fixture doesn't return an object, it just runs logic
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },

    // --- NEW FIXTURE: Screenshot on Failure ---
    // This fixture runs automatically for every test because of { auto: true }
    autoScreenshot: [async ({ page }, use, testInfo) => {
        // --- SETUP: Before the test ---
        await use(); 

        // --- TEARDOWN: After the test ---
        if (testInfo.status !== testInfo.expectedStatus) {
            // If the test failed, take a screenshot
            const screenshotPath = testInfo.outputPath(`failure.png`);
            await page.screenshot({ path: screenshotPath, fullPage: true });
            
            // Attach the screenshot to the Playwright HTML report
            await testInfo.attach('failure-screenshot', {
                path: screenshotPath,
                contentType: 'image/png',
            });
            console.log(`❌ Test Failed: Screenshot saved at ${screenshotPath}`);
        }
    }, { auto: true }] // This ensures it runs for every test without being called
});

export { expect } from '@playwright/test';