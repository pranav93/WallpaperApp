import React from "react";
import { useState } from "react";
import styles from "./App.module.css";
import Display from "./Display";

const App = () => {
  const [pictureData, setPictureData] = useState("");
  const [pictureName, setPictureName] = useState("");

  const downloadWallpaper = async () => {
    const imageUrl = "https://source.unsplash.com/1600x900/?wallpaper";
    // const imageUrl =
    //   "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyfHx8fHx8MTYzODA4MjI4OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600";
    electron.notificationApi.sendNotification("Getting wallpaper");
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const photoId = await response.url.match(/photo.*\?/g)[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
      setPictureData(base64data);
      setPictureName(photoId);
      electron.notificationApi.sendNotification("Done");
    };
  };

  const setWallpaper = () => {
    electron.filesApi.saveFile(pictureData, pictureName);
    electron.notificationApi.sendNotification("Saved");
    electron.shellApi.setWallpaper(pictureName);
    electron.notificationApi.sendNotification("Applied wallpaper");
  };

  return (
    <div className={styles.AppContainer}>
      {/* <h1 className={styles.CustomCss}>Wallpaper</h1> */}
      <Display wallpaperData={pictureData} />
      <div className={styles.ActionContainer}>
        <button onClick={downloadWallpaper}>New wallpaper</button>
        <button onClick={setWallpaper}>Set wallpaper</button>
      </div>
    </div>
  );
};

export default App;
