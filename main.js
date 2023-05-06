const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		}
	})

	ipcMain.handle('ping', () => {
		console.log('pong')
		return 'pong'
	})

	win.loadFile('index.html')
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

console.log("Hello World!")