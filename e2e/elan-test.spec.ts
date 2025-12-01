import { expect, test } from '@playwright/test';



test('long strings pass', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('test');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.locator('el-msg.ok')).toContainText('pass');
  await expect(page.locator('#test')).toContainText('pass');
});

test('long strings fail 1', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('test');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenty characters longex"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("strings differ from [36]. Actual (computed): || expected: |ex|")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

test('long strings fail 2', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('test');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty characters longac"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("strings differ from [36]. Actual (computed): |ac| expected: ||")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

test('long strings fail 3', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('test');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenly characters long"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("strings differ from [18]. Actual (computed): |ty characters long| expected: |ly characters long|")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

