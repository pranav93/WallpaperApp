const { ipcRenderer, contextBridge } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  filesApi: {
    saveFile(img) {
      console.log(img);
      try {
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, "base64");
        fs.writeFileSync(
          "/home/pranav/Pictures/temp",
          buf /* callback will go here */
        );
      } catch (e) {
        console.log(e);
        alert("Failed to save the file !");
      }
    },
  },
});
