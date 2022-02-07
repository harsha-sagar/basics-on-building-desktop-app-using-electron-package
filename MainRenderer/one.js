console.log('render process 1')

// electron-module module should be intialized in the main process, inorder to make use of it in this rendered process
const electron = require('@electron/remote')
const BrowserWindow = electron.BrowserWindow
const path = require("path")
const url = require("url")

let winThree

const createRenderer3Btn = document.getElementById('createRenderer3Btn')
createRenderer3Btn.addEventListener('click', () => {
	createWindowThree()
})

function createWindowThree(){
	winThree = new BrowserWindow(
		{
			// webPreferences configuration is required inorder to avail 'require.js' to client-side/browser
			webPreferences: {	
				contextIsolation: false,
				nodeIntegration: true
			}
		}
	)
	winThree.loadURL(
		url.format(
			{
				pathname: path.join(__dirname, 'three.html'),
				protocol: 'file',
				slashes: true
			}
		)
	)
	winThree.webContents.openDevTools()
	winThree.on('closed', () => {
		win = null
	})

}
