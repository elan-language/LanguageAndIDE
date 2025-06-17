import { expect, test } from '@playwright/test';

test('load and run worksheet', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('Worksheet', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'Standard worksheets' })).toBeVisible();
  
  await page.getByRole('button', { name: 'Standard worksheets' }).hover();
  await page.getByText('Test Worksheet').click();

  // to move off dropdown
  await page.getByRole('button', { name: 'Load external worksheet' }).hover();

  await expect(page.frameLocator('#worksheet-iframe').getByRole('button', { name: 'Auto-save to file' })).toBeVisible();

  await page.frameLocator('#worksheet-iframe').getByRole('button', { name: 'Auto-save to file' }).click();

  await expect(page.frameLocator('#worksheet-iframe').getByRole('checkbox', {name : 'Preliminaries completed'})).toBeVisible();
});