const electron = require("electron")

const ipc = electron.ipcRenderer

const asyncIpc = document.getElementById('asyncIpc')
asyncIpc.addEventListener('click', () => {
	console.log('-------------------')
	console.log('interim async log 1')
	ipc.send('async-message')
	console.log('interim async log 2')
	console.log('-------------------')
})
ipc.on('async-reply', (event, arg) => {
	console.log(arg)
})

const syncIpc = document.getElementById('syncIpc')
syncIpc.addEventListener('click', () => {
	console.log('------------------')
	console.log('interim sync log 1')
	const syncReply = ipc.sendSync('sync-message')
	console.log(syncReply)
	console.log('interim sync log 2')
	console.log('------------------')
})
