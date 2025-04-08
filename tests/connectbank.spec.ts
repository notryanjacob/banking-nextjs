import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-in');
    await page.getByRole('textbox', { name: 'Email Password' }).click();
    await page.getByRole('textbox', { name: 'Email Password' }).fill('notryanjacob@gmail.com');
    await page.getByRole('textbox', { name: 'Email Password' }).press('Tab');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Ryan@1234');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL('http://localhost:3000/');

    // ✅ Assert something exists on the main page 
    await expect(page.getByText('Horizon')).toBeVisible();
    await page.getByRole('button', { name: 'Connect bank' }).click();
    // await page.locator('iframe[title="Plaid Link"]').contentFrame().getByRole('button', { name: 'Continue' }).click();
    // await page.locator('iframe[title="Plaid Link"]').contentFrame().getByTestId('overlay-container').click();
    // await page.locator('iframe[title="Plaid Link"]').contentFrame().getByTestId('overlay-container').click();
    //wait 10 seconds
});