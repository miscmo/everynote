const information = document.getElementById('info');

information.innerText = `This app is using Chrom (v${window.versions.chrome()}), Node (v${window.versions.node()}), and Electron (v${window.versions.electron()})`


const func = async () => {
	const response = await window.versions.ping();

	const pong = document.getElementById('pong');
	pong.innerText = response;

	console.log(response);
}

func();

window.addEventListener('contextmenu', (e) => {
	e.preventDefault();

	// bad code
	// ipcRenderer.send('show-context-menu');
	window.versions.showContextMenu();
});

window.versions.contextMenuCommand((e, command) => {
	console.log(command);
});