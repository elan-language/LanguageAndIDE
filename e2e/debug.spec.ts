import { expect, test } from '@playwright/test';


test('debug simple types', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('l'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Enter');

  await page.keyboard.type('l'); 
  await page.keyboard.type('b');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"fred"');
  await page.keyboard.press('Enter');

  await page.keyboard.type('l'); 
  await page.keyboard.type('c');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1.0');
  await page.keyboard.press('Enter');

  await page.keyboard.type('l'); 
  await page.keyboard.type('d');
  await page.keyboard.press('Tab');
  await page.keyboard.type('true');
  await page.keyboard.press('Enter');

  await page.keyboard.type('l'); 
  await page.keyboard.type('f');
  await page.keyboard.press('Tab');
  await page.keyboard.type('/a+/');
  await page.keyboard.press('Enter');

  await page.keyboard.type('p'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('print', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  await expect(page.locator('#system-info')).toContainText('a 100');
  await expect(page.locator('#system-info')).toContainText('b "fred"');
  await expect(page.locator('#system-info')).toContainText('c 1.0');
  await expect(page.locator('#system-info')).toContainText('d true');
  await expect(page.locator('#system-info')).toContainText('f /a+/');


  await expect(page.locator('#run-status')).toContainText('paused');
 
});
