import { expect, test } from '@playwright/test';

test('shortcuts', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+d');

  await expect(page.getByAltText('clear display')).toBeVisible();

  await page.keyboard.press('Control+i');

  await expect(page.getByAltText('clear info')).toBeVisible();

  await expect(page.getByAltText('clear display')).not.toBeVisible();

  await page.keyboard.press('Control+h');

  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeVisible();
});

test('shortcuts uppercase', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+Shift+d');

  await expect(page.getByAltText('clear display')).toBeVisible();

  await page.keyboard.press('Control+Shift+i');

  await expect(page.getByAltText('clear info')).toBeVisible();

  await expect(page.getByAltText('clear display')).not.toBeVisible();

  await page.keyboard.press('Control+Shift+h');

  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+Shift+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeVisible();
});

test('tabs', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'trim'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'outline'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'Elan'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#help-home')).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#help-back')).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#help-forward')).toBeFocused();

 await page.keyboard.press('Control+d');

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'clear'})).toBeEnabled();

 await page.keyboard.press('Control+k');

 await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'load external worksheet'})).toBeFocused();
});

test('tabs uppercase', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+Shift+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'trim'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'outline'})).toBeFocused();

 await page.keyboard.press('Tab');

  await expect(page.getByRole('button', {name : 'Elan'})).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#help-home')).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#help-back')).toBeFocused();

 await page.keyboard.press('Tab');

 await expect(page.locator('#help-forward')).toBeFocused();

 await page.keyboard.press('Control+Shift+D');

 await page.keyboard.press('Tab');

 await expect(page.getByRole('button', {name : 'clear'})).toBeVisible();

 await page.keyboard.press('Control+Shift+k');

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
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await expect(page.getByText('Bubbles')).toBeFocused();

  await page.keyboard.press('ArrowDown');

  await expect(page.getByText('Burrow')).toBeFocused();

  await page.keyboard.press('ArrowUp');

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
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await page.keyboard.press('Tab');

  await expect(page.getByRole('button', {name : 'file'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('preferences')).toBeVisible();

  await expect(page.getByTitle('Clear the current code')).toBeFocused()

  await page.keyboard.press('ArrowDown');

  await expect(page.getByTitle('Load code from a file')).toBeFocused();

   await page.keyboard.press('ArrowUp');

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
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await expect(page.getByText('Guide to the worksheets')).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.frameLocator('#worksheet-iframe').getByText(/Blackjack 1/)).toBeVisible();

  await expect(page.getByText('Guide to the worksheets')).not.toBeVisible();
});

test('close menus by open menus', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

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
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await page.keyboard.press('Control+d');

  await expect(page.getByText('Guide to the worksheets')).not.toBeVisible();
});

test('close worksheet menu by click', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+k');

  await expect(page.getByRole('button', {name : 'standard worksheets'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Guide to the worksheets')).toBeVisible();

  await page.getByText("display").click();

  await expect(page.getByText('Guide to the worksheets')).not.toBeVisible();
});

test('run and stop program', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+b');

  await expect(page.locator('#run-button')).toBeDisabled();

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await expect(page.getByText('Bubbles')).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).not.toBeVisible();

  await expect(page.getByText('create 20 small bubbles')).toBeVisible();

  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop')).toBeDisabled();

  await page.keyboard.press('Control+r');

  await expect(page.locator('#run-button')).toBeDisabled();
  await expect(page.locator('#stop')).toBeEnabled();

  await expect(page.getByRole('button', {name : 'clear'})).toBeVisible();

  await expect(page.getByText('running')).toBeVisible();

  await page.keyboard.press('Control+s');

  await expect(page.getByText('running')).not.toBeVisible();

  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop')).toBeDisabled();
});

test('run and stop program uppercase', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.press('Control+Shift+b');

  await expect(page.locator('#run-button')).toBeDisabled();

  await expect(page.getByRole('button', {name : 'demo'})).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).toBeVisible();

  await expect(page.getByText('Bubbles')).toBeFocused();

  await page.keyboard.press('Enter');

  await expect(page.getByText('Life')).not.toBeVisible();

  await expect(page.getByText('create 20 small bubbles')).toBeVisible();

  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop')).toBeDisabled();

  await page.keyboard.press('Control+Shift+r');

  await expect(page.locator('#run-button')).toBeDisabled();
  await expect(page.locator('#stop')).toBeEnabled();

  await expect(page.getByRole('button', {name : 'clear'})).toBeVisible();

  await expect(page.getByText('running')).toBeVisible();

  await page.keyboard.press('Control+Shift+s');

  await expect(page.getByText('running')).not.toBeVisible();

  await expect(page.locator('#run-button')).toBeEnabled();
  await expect(page.locator('#stop')).toBeDisabled();
});

test('shortcut help', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.waitForTimeout(1000);

  await page.keyboard.press('Control+Shift+?');

  await expect(page.frameLocator('#help-iframe').getByText("Global instructions (also referred to as")).toBeVisible();

  await page.keyboard.press('Control+e');

  await page.keyboard.type('m');

  await page.keyboard.type('l');

  await page.keyboard.press('Control+Shift+?');

  await expect(page.frameLocator('#help-iframe').getByText("Valid forms for a procedure call are")).toBeVisible();

  await page.keyboard.press('Control+e');

  await page.keyboard.type('a');

  await page.keyboard.type('Tab');

  await page.keyboard.type('a');

  await page.keyboard.press('Control+Shift+?');

  await expect(page.frameLocator('#help-iframe').getByText("What is the difference between a compile error and a warning")).toBeVisible();

  await page.keyboard.press('Control+e');

  await page.keyboard.type(' a ');

  await page.keyboard.press('Control+Shift+?');

  await expect(page.frameLocator('#help-iframe').getByText("This field expects an expression.")).toBeVisible();
});

test('tabs parse', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.type("m");

  await page.keyboard.type("va");

  await expect(page.getByText("incomplete")).toBeVisible();

  await page.keyboard.press('Control+b');

  await page.keyboard.press('Tab');  
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  await expect(page.getByText("incomplete")).toBeFocused();
  await page.keyboard.press('Enter');

 await expect(page.locator("#var3")).toBeFocused();
});

test('tabs compile', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#help-home')).toBeVisible();

  await page.keyboard.type("m");

  await page.keyboard.type("va");

  await page.keyboard.type("a");

  await page.keyboard.press("Tab");

  await page.keyboard.type("a");

  await expect(page.getByText("unknown")).toBeVisible();

  await page.keyboard.press('Control+b');

  await page.keyboard.press('Tab');  
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

 await expect(page.getByText("unknown")).toBeFocused();
 await page.keyboard.press('Enter');

 await expect(page.locator("#var3")).toBeFocused();
});