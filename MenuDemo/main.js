console.log('starting main')

const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuIntem = electron.MenuItem
const globalShortcut = electron.globalShortcut

const path = require("path")
const url = require("url")

let win

function createWindow(){
	win = new BrowserWindow()
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))

	win.webContents.openDevTools()

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', () => {
	createWindow()

	// application menu
	const template = [
		{
			label: 'Edit',
			submenu: [
				{
					role: 'undo'
				},
				{
					role: 'redo'
				},
				{
					role: 'cut'
				},
				{
					role: 'copy'
				},
				{
					role: 'paste'
				},
				{
					role: 'delete'
				},
				{
					role: 'deleteall'
				}
			]
		},
		{
			label: 'Menu Demo',
			submenu: [
				{
					label: 'sub menu 1',
					click: () => {
						console.log('sub menu 1')
					}
				},
				{
					type: 'separator'
				},
				{
					label: 'sub menu 2'
				}
			]
		},
		{
			label: 'Help',
			submenu: [
				{
					label: 'about electron',
					click: () => {
						electron.shell.openExternal('https://www.electronjs.org/')
					},
					accelerator: 'Ctrl + Shift + H'
				}
			]
		}
	]
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	// context menu
	const contextMenu = new Menu()
	contextMenu.append(new MenuIntem({
		label: 'hello',
		click: () => {
			console.log('clicked on context menu Hello')
		}
	}))
	win.webContents.on('context-menu', (e, params) => {
		contextMenu.popup(win, params.x, params.y)
	})

	globalShortcut.register('Alt + 1', () => {
		win.show()
	})
})

app.on('will-quit', () => {
	globalShortcut.unregisterAll()
})

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
