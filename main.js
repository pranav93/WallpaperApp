const { win, BrowserWindow, app } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavascript: true,
      contextIsolation: true,
    },
  });
  win.loadFile("index.html");
}

app
  .whenReady()
  .then(createWindow)
  .catch((error) => console.log(error));

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});
