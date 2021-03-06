const { win, BrowserWindow, app, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
// /home/$USER/Pictures/.wallpapers
function createWindow() {
  const dir = `/home/${process.env["USER"]}/Pictures/.wallpapers`;
  const cacheFile = `${dir}/cache.json`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    let data = {
      files: {},
      recentFile: "",
    };
    fs.writeFileSync(cacheFile, JSON.stringify(data), "utf8");
  }

  const win = new BrowserWindow({
    width: 1400,
    height: 850,
    minWidth: 1400,
    minHeight: 850,
    backgroundColor: "#acacac",

    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavascript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
}

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

app
  .whenReady()
  .then(createWindow)
  .catch((error) => console.log(error));

if (!app.isPackaged) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}
