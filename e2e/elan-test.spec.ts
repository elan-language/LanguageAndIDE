import { expect, test } from '@playwright/test';



test('long strings pass', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('t');
  await page.keyboard.type('a');
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
 
  await page.keyboard.type('t');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenty characters longex"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("empty found at [36] (expected: e)")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

test('long strings fail 2', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('t');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty characters longac"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("a found at [36] (expected: empty)")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

test('long strings fail 3', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('t');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenly characters long"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("t found at [18] (expected: l)")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

test('long strings fail 4', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('t');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twentycharacters long"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("c found at [20] (expected: space)")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

test('long strings fail 5', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.keyboard.type('t');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('"a string over twenty  characters long"');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"a string over twenty characters long"');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  await expect(page.getByText("space found at [21] (expected: c)")).toBeVisible();
  await expect(page.locator('#test')).toContainText('fail');
});

