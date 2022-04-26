const { app, BrowserWindow } = require('electron')

let win

function createWindow () {

    win = new BrowserWindow({
        width: 1200,
        height: 700
    })
    win.setAutoHideMenuBar(true)
    win.loadFile('index.html')
    
}
app.on('ready', createWindow)
