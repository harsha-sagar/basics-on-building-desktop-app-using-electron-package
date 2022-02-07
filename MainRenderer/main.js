console.log('main process')

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require("path")
const url = require("url")

// let win
let winOne, winTwo

function createWindow(){
	// win = new BrowserWindow(
	// 	{
	// 		// webPreferences configuration is required inorder to avail 'require.js' to client-side/browser
	// 		webPreferences: {	
	// 			contextIsolation: false,
	// 			nodeIntegration: true
	// 		}
	// 	}
	// )
	// win.loadURL(
	// 	url.format(
	// 		{
	// 			pathname: path.join(__dirname, 'index.html'),
	// 			protocol: 'file',
	// 			slashes: true
	// 		}
	// 	)
	// )
	// win.webContents.openDevTools()

	// win.on('closed', () => {
	// 	win = null
	// })

	winOne = new BrowserWindow(
		{
			// webPreferences configuration is required inorder to avail 'require.js' to client-side/browser
			webPreferences: {	
				nodeIntegration: true,
				enableRemoteModule: true,
				contextIsolation: false,
			}
		}
	)
	winOne.loadURL(
		url.format(
			{
				pathname: path.join(__dirname, 'one.html'),
				protocol: 'file',
				slashes: true
			}
		)
	)
	winOne.webContents.openDevTools()
	winOne.on('closed', () => {
		win = null
	})

	// to enable electron-remote module for winOne renderer process  
	const remoteElectron = require('@electron/remote/main')
	remoteElectron.initialize()
	remoteElectron.enable(winOne.webContents)
	
	winTwo = new BrowserWindow(
		{
			// webPreferences configuration is required inorder to avail 'require.js' to client-side/browser
			webPreferences: {	
				contextIsolation: false,
				nodeIntegration: true
			}
		}
	)
	winTwo.loadURL(
		url.format(
			{
				pathname: path.join(__dirname, 'two.html'),
				protocol: 'file',
				slashes: true
			}
		)
	)
	winTwo.webContents.openDevTools()
	winTwo.on('closed', () => {
		win = null
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

