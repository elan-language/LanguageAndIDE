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

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'clear'})).toBeFocused();

 await page.keyboard.press('Control+k');

 await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'load external worksheet'})).toBeFocused();
});

test('demos', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await page.keyboard.press('ArrowDown');

  await expect(page.getByText('Bubbles')).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).not.toBeVisible();

  await expect(page.getByText('create 20 small bubbles')).toBeVisible();
});

test('files', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await page.keyboard.press('Tab');

  await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('preferences')).toBeVisible();

  await page.keyboard.press('ArrowDown');

  await expect(page.getByTitle('Clear the current code')).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.getByTitle('Clear the current code')).not.toBeVisible();

  await expect(page.getByText('main procedure')).toBeVisible();
});

test('worksheets', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await page.keyboard.press('ArrowDown');

  await expect(page.getByText('Guide to the worksheets')).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.frameLocator('#worksheet-iframe').getByText(/The standard worksheets listed below/)).toBeVisible();

  await expect(page.getByText('Guide to the worksheets')).not.toBeVisible();
});

test('close menus by open menus', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await page.keyboard.press('Tab');

  await page.keyboard.press('Enter');

  await expect(page.getByText('preferences')).toBeVisible();

  await expect(page.getByText('Life')).not.toBeVisible();

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await expect(page.getByText('preferences')).not.toBeVisible();
 
});

test('close demo menu by other button', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await page.keyboard.press('Tab');

  await page.keyboard.press('Tab');

  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).not.toBeVisible();
 
});

test('close demo menu by keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByText('Life')).not.toBeVisible();
});

test('close demo menu by click', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await page.getByText("main procedure function").click();

  await expect(page.getByText('Life')).not.toBeVisible();
});

test('close file menu by other button', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await page.keyboard.press('Tab');

  await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('preferences')).toBeVisible();

  await page.keyboard.press('Tab');

  await page.keyboard.press('Enter');

  await expect(page.getByText('preferences')).not.toBeVisible();
 
});

test('close file menu by keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await page.keyboard.press('Tab');

  await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('preferences')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByText('preferences')).not.toBeVisible();
});

test('close file menu by click', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await page.keyboard.press('Tab');

  await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('preferences')).toBeVisible();

  await page.getByText("display").click();

  await expect(page.getByText('preferences')).not.toBeVisible();
});

test('close worksheet menu by other button', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');

  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).not.toBeVisible();
 
});

test('close worksheet menu by keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await page.keyboard.press('Control+p');

  await expect(page.getByText('Guide to the worksheets')).not.toBeVisible();
});

test('close worksheet menu by click', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#doc-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await page.getByText("display").click();

  await expect(page.getByText('Guide to the worksheets')).not.toBeVisible();
});
