console.log('starting main')

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require("path")
const url = require("url")

let win

function createWindow(){
	// by default browser window size would be 800px width & 600px height. If required can be configured as below
	// win = new BrowserWindow({
	// 	width: 400,
	// 	height: 400,
	// 	maxHeight: 600,
	// 	maxWidth: 600,
	// 	backgroundColor: '#228b22',
	// 	frame: false 
	// })
	// win.on('closed', () => {
	// 	win = null
	// })

	// parentWin = new BrowserWindow({
	// 	title: 'parent window'
	// })
	// childWin = new BrowserWindow({
	// 	title: 'child window',
	// 	parent: parentWin,
	// 	modal: true
	// })
	// parentWin.on('closed', () => {
	// 	parentWin = null
	// })
	// childWin.on('closed', () => {
	// 	childWin = null
	// })

	parentWin = new BrowserWindow({
		title: 'parent window'
	})
	childWin = new BrowserWindow({
		parent: parentWin,
		modal: true,
		show: false
	})
	childWin.loadURL('https://github.com/')
	childWin.once('ready-to-show', () => {
		childWin.show()
	})
	parentWin.on('closed', () => {
		parentWin = null
	})
	childWin.on('closed', () => {
		childWin = null
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
