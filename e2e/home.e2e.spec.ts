import { expect, test, _electron as electron } from '@playwright/test';



test('electron launches', async ({ page }) => {
  const electronApp = await electron.launch({ args: ['.'] })

  const window = await electronApp.firstWindow();

  const appPath = await electronApp.evaluate(async ({ app }) => {
    return app.getAppPath();
  });
  console.log(`App running from: ${appPath}`);

  await electronApp.close();
})

test('home page populates client dropdown from DB', async ({page}) => {
  const electronApp = await electron.launch({ args: ['.'] });
  const window = await electronApp.firstWindow();

  const appPath = await electronApp.evaluate(async ({ app }) => {
    return app.getAppPath();
  });

  console.log(`App running from: ${appPath}`);

  expect(await window.locator('button')).toHaveCount(2);
  await window.click('mat-select#clientDropdown');

  expect(await window.locator('mat-option')).toHaveCount(5);

  await electronApp.close();
})

test('clicking the correct form progresses to the correct page', async ({page}) => {
  // HIPAA Authorization Form

  const electronApp = await electron.launch({ args: ['.'] });
  const window = await electronApp.firstWindow();

  const appPath = await electronApp.evaluate(async ({ app }) => {
    return app.getAppPath();
  });

  console.log(`App running from: ${appPath}`);

  await window.click('mat-select#client-dropdown');
  await window.click('mat-option#client3');

  await window.click('mat-select#form-dropdown');
  await window.click('mat-option#form4');

  await window.click('#proceed-to-form');



})
