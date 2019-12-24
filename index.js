const { ipcRenderer } = require('electron');

let runFrame = 0;

ipcRenderer.on('update', (event, data) => {
	if (data.flip) {
		document.body.style.transform = 'scaleX(-1)';
	} else {
		document.body.style.transform = 'scaleX(1)';
	}
	if (data.run) {
		document.querySelector('#mario-idle').style.opacity = 0;
		document.querySelector(`#mario-run${Math.round(runFrame) + 1}`).style.opacity = 0;
		runFrame += 0.25;
		if (runFrame >= 2.5) {
			runFrame = 0;
		}
		document.querySelector(`#mario-run${Math.round(runFrame) + 1}`).style.opacity = 1;
	} else {
		document.querySelector(`#mario-run${Math.round(runFrame) + 1}`).style.opacity = 0;
		document.querySelector('#mario-idle').style.opacity = 1;
		runFrame = 0;
	}
});