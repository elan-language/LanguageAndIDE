import { expect, test } from '@playwright/test';

test('lambda symbol completion', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('cl');
  await page.keyboard.type('Foo');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await page.keyboard.type('p');
  await page.keyboard.type('bar');
  await page.keyboard.press('Tab');
  await page.keyboard.type('l');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Func<of Foo => Int>');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await page.keyboard.type('m');
  await page.keyboard.type('c');
  await page.keyboard.type('bar');
  await page.keyboard.press('Tab');
  await page.keyboard.type('lambda aFoo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('aF');

  await expect(page.locator('#args13')).toContainText('aFoo');
});