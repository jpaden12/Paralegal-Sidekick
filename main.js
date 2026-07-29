import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import path from 'path';
import url from 'url';

// Stored under Electron's userData directory so it survives app restarts,
// updates, and reinstalls, rather than living inside the (often read-only
// or update-replaced) app bundle/resources.
const getDbPath = () => {
  const persistedDbPath = path.join(app.getPath('userData'), 'profiles.db');

  if (!fs.existsSync(persistedDbPath)) {
    // app.isPackaged is false when running from source (e.g. `electron .`),
    // in which case process.resourcesPath points at Electron's own
    // resources rather than this project's.
    const seedDbPath = app.isPackaged
      ? path.join(process.resourcesPath, 'profiles.db')
      : path.join(import.meta.dirname, 'profiles.db');

    if (fs.existsSync(seedDbPath)) {
      fs.copyFileSync(seedDbPath, persistedDbPath);
    }
  }

  return persistedDbPath;
};

const createWindow = () => {
  const dbPath = getDbPath();

  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(import.meta.dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      additionalArguments: [`--db-path=${dbPath}`],
    },
  });

  win.loadURL(
        url.format({
            pathname: path.join(import.meta.dirname, `./dist/paralegal-sidekick/browser/index.html`),
            protocol: "file:",
            slashes: true,
        })
  );

}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (mainWindow === null) createWindow();
});
