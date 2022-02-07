console.log('starting main')

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const ipc = electron.ipcMain
const dialog = electron.dialog

const path = require("path")
const url = require("url")

let win

function createWindow(){
	win = new BrowserWindow(
		{
			webPreferences: {	
				nodeIntegration: true,
				enableRemoteModule: true,
				contextIsolation: false,
			}
		}
	)
	win.webContents.openDevTools()
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))

	win.on('closed', () => {
		win = null
	})

	ipc.on('async-message', (event) => {
		event.sender.send('async-reply', 'main process responding async reply')
	})

	ipc.on('sync-message', (event) => {
		event.returnValue = 'main process responding sync reply'
	})

}

app.on('ready', createWindow)

// mac specific configuration
// app.on('window-all-closed', ()=> {
// 	if(process.platform !== 'darwin'){
// 		app.quit()
// 	}
// })

// app.on('activate', () => {
// 	if(win === null){
// 		createWindow()
// 	}
// })
