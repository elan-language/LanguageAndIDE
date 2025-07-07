import { expect, test } from '@playwright/test';

test('shortcuts', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+p');

  await expect(page.getByRole('button', {name : 'clear'})).toBeVisible();

  await page.keyboard.press('Control+g');

  await expect(page.locator('#run-debug-button')).toBeVisible();

  await page.keyboard.press('Control+h');

  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeVisible();
});

test('tabs', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'trim'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'outline'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#doc-home')).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#doc-back')).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#doc-forward')).toBeFocused();

 await page.keyboard.press('Control+p');
});
