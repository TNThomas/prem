import { expect, test } from '@playwright/test';

const pages = ["/", "/changeLogs", "/docs"]

for (const addr of pages) {
	test(`page header on ${addr}`, async ({ page }) => {
		await page.goto(addr);
		await expect(page.getByRole('heading', { name: 'PREM', exact: true })).toBeVisible();
	});
}

