import React from "react";
import { useState } from "react";

const Picture = ({ data }) => <img src={data} />;

const App = () => {
  const [pictureData, setPictureData] = useState("");
  return (
    <>
      <h1>Wallpaper</h1>
      <button
        onClick={async () => {
          const imageUrl = "https://source.unsplash.com/1600x900/?wallpaper";
          electron.notificationApi.sendNotification("Getting wallpaper");
          const response = await fetch(imageUrl);
          const imageBlob = await response.blob();
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onloadend = () => {
            const base64data = reader.result;
            console.log(base64data);
            setPictureData(base64data);
            electron.notificationApi.sendNotification("Done");
          };
        }}
      >
        New wallpaper
      </button>
      <button
        onClick={() => {
          electron.filesApi.saveFile(pictureData);
          electron.notificationApi.sendNotification("Saved");
        }}
      >
        Save to disk
      </button>
      <Picture data={pictureData}></Picture>
    </>
  );
};

export default App;
