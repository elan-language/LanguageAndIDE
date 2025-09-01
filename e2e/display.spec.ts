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

test('clear buffer', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('l');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('inputInt("")');
  await page.keyboard.press('Enter');
  await page.keyboard.type('l');
  await page.keyboard.type('b');
  await page.keyboard.press('Tab');
  await page.keyboard.type('waitForKey()');
  await page.keyboard.press('Enter');
  await page.keyboard.type('p');
  await page.keyboard.type('b');


  await page.getByRole('button', { name: 'run' }).click();

  await page.locator('#inp').fill('2');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("2");
  await page.keyboard.press('Enter');
  await expect(page.locator('#printed-text')).toContainText("Enter");


});