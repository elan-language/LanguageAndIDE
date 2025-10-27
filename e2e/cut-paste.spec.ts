import { expect, test } from '@playwright/test';

test('copy code', async ({ page }) => {
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
  await page.keyboard.type('1');


  await page.getByText('let', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('copy (Ctrl-c)').click();

  const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

  expect(clipboardContent).toContain('let a be 1');
});

test('paste code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.evaluate(() => navigator.clipboard.writeText("let a be 2"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');

  await page.getByText('call').click();

  await page.keyboard.press('Control+v');

  await expect(page.locator('#var4')).toContainText('a');
});

test('paste invalid code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.evaluate(() => navigator.clipboard.writeText("let a be 2"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.press('Control+v');

  await expect(page.locator('div.context-menu div')).toContainText('Paste Failed:');
});

