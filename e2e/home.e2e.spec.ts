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
