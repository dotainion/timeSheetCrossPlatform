const { BrowserWindow, app, ipcMain, ipcRenderer, dialog, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { autoUpdater } = require('electron-updater');
require('update-electron-app')();

const isMac = process.platform === 'darwin';

let mainWindow;

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
                ]
            }
            ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
            ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
            ] : [
            { role: 'close' }
            ])
        ]
    },
    {
        role: 'help',
        submenu: [
            {
            label: 'Learn More',
            click: async () => {
                //const { shell } = require('electron')
                //await shell.openExternal('https://electronjs.org')
            }
            }
        ]
    }
];


const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 720,
        frame: true,
        resizable: true,
        transparent: false, 
        autoHideMenuBar: false,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );
    mainWindow.on("closed", () => (mainWindow = null));

    //open dev tool console
    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        //alert('checking for updates....');
        console.log('checking for updates...');
        autoUpdater.checkForUpdatesAndNotify();
    });
    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 60000)
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

//added 
ipcMain.on('app_version', (event) => {
    console.log('sending varsion.....');
    event.sender.send('app_version', {
        version: app.getVersion()
    });
});

autoUpdater.on('update-available', () => {
    console.log('sending updates.....');
    mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    console.log('downloading updates.....');
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.',
    }
    
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
    //mainWindow.webContents.send('update_downloaded');
});

/*ipcRenderer.on('update_available', () => {
    console.log('A new update is available. Downloading now...');
    ipcRenderer.removeAllListeners('update_available');
});
ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    console.log('Update Downloaded. It will be installed on restart. Restart now?');
});

//this should be in another file if posiple so it can be called.
function restartApp() {
    ipcRenderer.send('restart_app');
}*/

ipcMain.on('restart_app', () => {
    console.log('restarting...');
    autoUpdater.quitAndInstall();
});

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
