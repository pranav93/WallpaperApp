const { ipcRenderer, contextBridge } = require("electron");
const fs = require("fs");
const { exec } = require("child_process");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  filesApi: {
    saveFile(img, name) {
      console.log(img);
      try {
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, "base64");
        fs.writeFileSync(
          `/home/pranav/Pictures/${name}`,
          buf /* callback will go here */
        );
      } catch (e) {
        console.log(e);
        alert("Failed to save the file !");
      }
    },
  },
  shellApi: {
    setWallpaper(filename) {
      exec(
        "gsettings set org.gnome.desktop.background picture-uri file:////home/pranav/Pictures/",
        (error, stdout, stderr) => {
          // debugger;
          console.log("Inside wall");
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }

          console.log(`stdout: ${stdout}`);
          exec(
            `gsettings set org.gnome.desktop.background picture-uri file:////home/pranav/Pictures/${filename}`,
            (error, stdout, stderr) => {
              // debugger;
              console.log("Inside wall 2");
              if (error) {
                console.log(`error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
              }

              console.log(`stdout: ${stdout}`);
            }
          );
        }
      );
    },
  },
});
