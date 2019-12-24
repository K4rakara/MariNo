const { app, BrowserWindow, screen } = require('electron');

let window;
let windowInterval;

let createWindow = () => {
	window = new BrowserWindow({
		width: 16,
		height: 16,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		resizable: false,
		skipTaskbar: true,
		webPreferences: {
			nodeIntegration: true
		}
	});

	window.loadFile('index.html');
	
	windowInterval = setInterval(() => {
		let cursor = screen.getCursorScreenPoint();
		let windowLocation = window.getPosition();
		let windowDistance = Math.sqrt(Math.pow((windowLocation[0] - cursor.x),2) + Math.pow((windowLocation[1] - cursor.y),2));
		if (windowDistance <= 128) {
			(cursor.x > windowLocation[0]) ? windowLocation[0] -= 4 : windowLocation[0] += 4;
			(cursor.y > windowLocation[1]) ? windowLocation[1] -= 4 : windowLocation[1] += 4;
		}
		window.setPosition(windowLocation[0], windowLocation[1]);
		window.webContents.send('update', {
			run: (windowDistance <= 128),
			flip: (cursor.x > windowLocation[0])
		});
	}, 16);

	window.on('closed', () => {
		window = null;
		clearInterval(windowInterval);
	});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (window === null) createWindow();
});