const { contextBridge, ipcRenderer, app, ipcMain } = require('electron');


document.addEventListener('DOMContentLoaded', ()=>{
    console.log('hello world this is a test...');
    ipcRenderer.on('update_available', () => {
        document.getElementById('root').style.border = '10px solid red';
        console.log('A new update is available. Downloading now...');
        ipcRenderer.removeAllListeners('update_available');
    });
    ipcMain.on('app_version', (event) => {
        console.log('sending varsion.....');
        event.sender.send('app_version', {
            version: app.getVersion()
        });
    });
});
