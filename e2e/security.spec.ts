import { test, expect } from '@playwright/test';

test('img click xss', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });

  page.on('console', async msg => {
    if (msg.type() === 'error') {
      expect(msg.text()).toContain("Blocked script execution in 'about:srcdoc' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.");
    }
  });

  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('p');
  await page.keyboard.type(`"<img src='images/Debug.png' onclick=console.error('exploit') />"`);
  await page.keyboard.press('Tab');

  await page.getByRole('button', { name: 'Run the program' }).click();
  await page.locator('#printed-text').click();
});

test('iframe xss', async ({ page }) => {
    page.once('dialog', dialog => {
      //console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
  
    page.on('console', async msg => {
      if (msg.type() === 'error') {
        expect(msg.text()).toContain("Blocked script execution in 'about:srcdoc' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.");
      }
    });
  
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');
   
    await page.getByText('main procedure function test').click();
  
    await page.keyboard.type('m');
    await page.keyboard.type('p');
    await page.keyboard.type(`"<iframe src=javascript:console.error('exploit') ></iframe>"`);
    await page.keyboard.press('Tab');
  
    await page.getByRole('button', { name: 'Run the program' }).click();
  });

  test('string eval xss', async ({ page }) => {
    page.once('dialog', dialog => {
      //console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
  
    page.on('console', async msg => {
      if (msg.type() === 'error') {
        expect(msg.text()).not.toContain("exploit");
      }
    });
  
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');
   
    await page.getByText('main procedure function test').click();
  
    await page.keyboard.type('m');
    await page.keyboard.type('v');
    await page.keyboard.type('aa');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"a"`);
    await page.keyboard.press('Enter');

    await page.keyboard.type('v');
    await page.keyboard.type('b');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"{a}\` + eval('console.error(\`exploit\`)') + \`"`);
    await page.keyboard.press('Enter');
  
    await page.getByRole('button', { name: 'Run the program' }).click();
  });

  test('string js xss', async ({ page }) => {
    page.once('dialog', dialog => {
      //console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
  
    page.on('console', async msg => {
      if (msg.type() === 'error') {
        expect(msg.text()).not.toContain("exploit");
      }
    });
  
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');
   
    await page.getByText('main procedure function test').click();
  
    await page.keyboard.type('m');
    await page.keyboard.type('v');
    await page.keyboard.type('aa');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"a"`);
    await page.keyboard.press('Enter');

    await page.keyboard.type('v');
    await page.keyboard.type('b');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"{a}\` + console.error('exploit') + \`"`);
    await page.keyboard.press('Enter');
  
    await page.getByRole('button', { name: 'Run the program' }).click();
  });