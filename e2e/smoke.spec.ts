import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Elan/);
});

test('simple program', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'File' }).hover();


  await page.keyboard.type('m');
  await page.keyboard.type('p');
  await page.keyboard.type('100');
  await page.keyboard.press('Tab');

  await page.getByRole('button', { name: 'Run the program' }).click();
  await expect(page.locator('#printed-text')).toContainText('100');
});

test('load and run demo', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'Demo' }).hover();
  await page.getByText('Binary Search').click();

  await page.getByRole('button', { name: 'Run the program' }).click();
  await expect(page.locator('#printed-text')).toContainText("What type of fruit do you want ('x' to exit)? ");

  await page.locator('#inp').fill('fig');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("What type of fruit do you want ('x' to exit)? fig We can supply a fig What type of fruit do you want ('x' to exit)? ");
});

test('debug program', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('p'); // procedure
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('a as Int');
  await page.keyboard.press('Enter');

  await page.keyboard.type('p'); // print
  await page.keyboard.type('100');
  await page.keyboard.press('Enter');

  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('End'); // to outer selector

  await page.keyboard.type('m'); // main
  await page.keyboard.type('c'); // call
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Tab');

  await page.getByText('print', { exact: true }).click({
    button: 'right'
  });
  await page.getByText('set breakpoint (Ctrl-b)').click();
  await page.getByRole('button', { name: 'Debug the program' }).click();
  await expect(page.locator('#system-info')).toContainText('a : 100');
  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('compile error', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('c'); // call
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  
  await expect(page.locator('#call5')).toContainText('\'foo\' is not defined. Click for more info.');
  await expect(page.locator('#compile')).toContainText('unknown symbol');
});
