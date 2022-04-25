const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = electron.ipcMain;


let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 750, 
        height: 590,
        icon: __dirname + '../src/images/logo.png',
        frame: false,
        resizable: false,
        transparent: true, 
        autoHideMenuBar: true,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
            preload: path.resolve('./src/electron/preload.js'),
        }
    });

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    //open dev tool console
    //mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

/* added */
/*ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', {
        version: app.getVersion()
    });
});

mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    console.log('A new update is available. Downloading now...');
});
ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    console.log('Update Downloaded. It will be installed on restart. Restart now?');
});

//this should be in another file if posiple so it can be called.
function restartApp() {
    ipcRenderer.send('restart_app');
}

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});*/

//add file name electronBuilder.yml and add bellow code in comment.
//electronBuilder.yml should be in a gitignore file
/*appId: com.example.ElectronAutoUpdate
publish:
  provider: github
  token: [YOUR GITHUB ACCESS TOKEN]*/

/*
On GitHub, create a repository for your app. 
Then you can specify it in package.json, 
so that electron-builder knows where to publish releases:
"repository": {
  "type" : "git",
  "url" : "https://github.com/[YOUR USERNAME]/[YOUR REPO NAME].git"
},*/

/**
 * you may want to do if not done.
 * git init
git remote add origin https://github.com/[YOUR USERNAME]/[YOUR REPO NAME].git
 */

/**
 * Let’s now add scripts to package.json to build and deploy the app with electron-builder:
"build": "electron-builder build --mac --win --publish never",
"deploy": "electron-builder build --mac --win --publish always"

If you’re on Windows, leave out the --mac flag, as you cannot build for Mac and this will throw an error.

The build script will package the application but skip deployment, for testing purposes. The deploy script will package the app, and create a new release on GitHub.

*/
