import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
    },
  })

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