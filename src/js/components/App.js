import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./App.module.css";
import Display from "./Display";

const App = () => {
  const [wallpaperData, setWallpaperData] = useState("");
  const [wallpaperName, setWallpaperName] = useState("");

  const downloadWallpaper = async (imageUrl) => {
    // const imageUrl =
    //   "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyfHx8fHx8MTYzODA4MjI4OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600";
    electron.notificationApi.sendNotification("Getting wallpaper");
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    let photoId = await response.url.match(/photo.*\?/g)[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
      setWallpaperData(base64data);
      photoId = photoId.slice(0, -1);
      setWallpaperName(photoId);
      electron.notificationApi.sendNotification("Done");
    };
  };

  const setLocalWallpaper = async (imageUrl) => {
    electron.notificationApi.sendNotification("Getting wallpaper");
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    debugger;
    let photoId = response.url.match(/photo.*/g)[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
      setWallpaperData(base64data);
      setWallpaperName(photoId);
      electron.notificationApi.sendNotification("Done");
    };
  };

  const setWallpaper = () => {
    electron.filesApi.saveFile(wallpaperData, wallpaperName);
    electron.filesApi.saveMetadataToJson(wallpaperName);
    electron.notificationApi.sendNotification("Saved");
    electron.shellApi.setWallpaper(wallpaperName);
    electron.filesApi.saveMetadataToJson(wallpaperName);
    electron.notificationApi.sendNotification("Applied wallpaper");
  };

  useEffect(() => {
    const recentWallpaper = electron.filesApi.getRecentWallpaper();
    if (!recentWallpaper.exists) {
      downloadWallpaper("https://source.unsplash.com/1600x900/?wallpaper");
    } else {
      setLocalWallpaper(recentWallpaper.url);
    }
  }, []);

  return (
    <div className={styles.AppContainer}>
      {/* <h1 className={styles.CustomCss}>Wallpaper</h1> */}
      <Display wallpaperData={wallpaperData} />
      <div className={styles.ActionContainer}>
        <button
          onClick={() => {
            downloadWallpaper(
              "https://source.unsplash.com/1600x900/?wallpaper"
            );
          }}
        >
          New wallpaper
        </button>
        <button onClick={setWallpaper}>Set wallpaper</button>
      </div>
    </div>
  );
};

export default App;
