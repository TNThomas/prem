import { expect, test } from '@playwright/test';

test.describe("Calculator", () => {
    const params = [
        "output 0",
        "output 2d2d6"
    ]
    for (const testCase of params) {
        test(`Evaluates input "${testCase}"`, async ({ page }) => {
            await page.goto('/');
            await page.getByRole('textbox').locator('div').click();
            await page.getByRole('textbox').fill(testCase);
            await page.getByRole('button', { name: 'Calculate' }).click();
            await expect(page.locator('#resultView').getByText('Output 1')).toBeVisible();
        });
    }

})