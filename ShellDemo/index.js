const openBtn = document.getElementById('openBtn')

const shell = require('electron').shell

openBtn.addEventListener('click', () => {
	shell.showItemInFolder('/home/z2sagar/Pictures/s3-plan.png') 
})
