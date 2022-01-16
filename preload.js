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
          `/home/${process.env["USER"]}/Pictures/.wallpapers/${name}`,
          buf
        ); // TODO make async
      } catch (e) {
        alert(e);
        alert("Failed to save the file !");
      }
    },
    saveMetadataToJson(name) {
      const dir = `/home/${process.env["USER"]}/Pictures/.wallpapers`;
      const cacheFile = `${dir}/cache.json`;
      fs.readFile(cacheFile, "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(data); //now it an object
          const timeStamp = +new Date();
          obj.files[timeStamp] = name; //add some data
          obj.recentFile = name;
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFileSync(cacheFile, json, "utf8"); // TODO make async
        }
      });
    },
  },
  shellApi: {
    setWallpaper(filename) {
      exec(
        `gsettings set org.gnome.desktop.background picture-uri file:////home/${process.env["USER"]}/Pictures/`,
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
            `gsettings set org.gnome.desktop.background picture-uri file:////home/${process.env["USER"]}/Pictures/.wallpapers/${filename}`,
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
