import { expect, test } from '@playwright/test';

test('load and run worksheet', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });

  function workSheetFrame() {
    return page.frameLocator('#worksheet-iframe');
  }

  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('Worksheet', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'Standard worksheets' })).toBeVisible();
  
  await page.getByRole('button', { name: 'Standard worksheets' }).hover();
  await page.getByText('Test Worksheet').click();

  // to move off dropdown
  await page.getByRole('button', { name: 'Load external worksheet' }).hover();

  await expect(workSheetFrame().getByRole('button', { name: 'Auto-save to file' })).toBeVisible();

  await expect(workSheetFrame().getByRole('checkbox', {name : 'Preliminaries completed'})).not.toBeVisible();

  await workSheetFrame().getByRole('button', { name: 'Auto-save to file' }).click();

  await expect(workSheetFrame().getByRole('checkbox', {name : 'Preliminaries completed'})).toBeVisible();

  await workSheetFrame().getByRole('checkbox', {name : 'Preliminaries completed'}).click();
  // click twice to check for multiple errors bug
  await workSheetFrame().getByRole('checkbox', {name : 'Preliminaries completed'}).click();

  // this will fail if multiple
  await expect(workSheetFrame().getByText('All required inputs must be completed to continue')).toBeVisible();

  await workSheetFrame().getByRole('textbox').fill("a user");

  await workSheetFrame().getByRole('checkbox', {name : 'Preliminaries completed'}).click();

  await expect(workSheetFrame().getByText('All required inputs must be completed to continue')).not.toBeVisible();

  await expect(workSheetFrame().getByRole('checkbox', {name : 'Preliminaries completed'})).not.toBeVisible();

  await expect(workSheetFrame().getByText('Step 1')).toBeVisible();

  await expect(workSheetFrame().getByText('Hint1: Title')).toBeVisible();

  await expect(workSheetFrame().getByText('Total hints used: 0/2')).toBeVisible();

  await expect(workSheetFrame().getByText('Simple content')).not.toBeVisible();

  await workSheetFrame().getByText('Hint1: Title').click();

  await expect(workSheetFrame().getByText('Simple content')).toBeVisible();

  await expect(workSheetFrame().getByText('Total hints used: 1/2')).toBeVisible();

  await expect(workSheetFrame().locator('.timestamp')).toHaveCount(2);

  await expect(workSheetFrame().getByText('Hint2: Title')).toBeVisible();

  await expect(workSheetFrame().getByText('Code content')).not.toBeVisible();

  await workSheetFrame().getByText('Hint2: Title').click();

  await expect(workSheetFrame().getByText('Code content')).toBeVisible();

  await expect(workSheetFrame().getByText('Total hints used: 2/2')).toBeVisible();

  await expect(workSheetFrame().locator('.timestamp')).toHaveCount(3);

  await workSheetFrame().getByRole('checkbox', {name : 'Step completed'}).click();

  await expect(workSheetFrame().getByText('Worksheet completed')).toBeVisible();
});