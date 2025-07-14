import { expect, test } from '@playwright/test';

test('display html', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('c');
  await page.keyboard.type('displayHtml');
  await page.keyboard.press('Tab');
  await page.keyboard.type(`"<p id='test-value'>fred</p>"`);
  await page.keyboard.press('Enter');

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.frameLocator('#display-html-sandbox').locator('#test-value')).toContainText('fred');
});