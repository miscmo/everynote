const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	// we can also expose variables, not just functions

	ping: () => ipcRenderer.invoke('ping'),
	ipcRenderer: ipcRenderer,
	showContextMenu: () => ipcRenderer.send('show-context-menu'),
	contextMenuCommand: (callback) => ipcRenderer.on('context-menu-command', callback)
})