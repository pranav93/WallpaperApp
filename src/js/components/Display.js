import React from "react";
import styles from "./Display.module.css";

const Wallpaper = ({ className, data }) => (
  <img className={className} src={data} />
);

const Display = ({ wallpaperData }) => (
  <div className={styles.PictureContainer}>
    <Wallpaper className={styles.Picture} data={wallpaperData}></Wallpaper>
  </div>
);

export default Display;
