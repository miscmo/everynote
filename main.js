const { app, BrowserWindow, ipcMain } = require('electron')
const { Menu } = require('electron')

const path = require('path')

const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'
const isLinux = process.platform === 'linux'
const productName = 'EveryNote'

// main window
const createWindow = () => {
	app.setName(productName)
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

	ipcMain.on('show-context-menu', (e) => {
		const template = [
			{
				label: 'item 1',
				click: () => { e.sender.send('context-menu-command', 'item 1') }
			},
			{ type: 'separator' },
			{ label: 'item 2', type: 'checkbox', checked: true },
		]

		const menu = Menu.buildFromTemplate(template)
		menu.popup(BrowserWindow.fromWebContents(e.sender))
	})


	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

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


// menu
const template = [
	{
		label: productName,
		role: 'appMenu',

		submenu: [
			{ role: 'about' },
			{ type: 'separator' },
			{ role: 'services' },
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideOthers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit' }
		]
	},
	{
		label: 'File',
		role: 'fileMenu',
		submenu: [
			{
				label: 'New',
				click: () => {
					console.log('New')
				}
			},
			{
				label: 'Open',
				click: () => {
					console.log('Open')
				}
			}
		]
	},
	{
		label: 'Help',
		role: 'help',
		submenu: [
			{role: 'toggleDevTools'},
			{role: 'reload'},
			{role: 'forceReload'},
			{role: 'resetZoom'},
		]
	}
]


console.log("Hello World!")