import React from "react";
import classes from "./Home.module.css";
function BannerContent({
  title,
  description,
  img,
  currentindex,
  visibilityindex,
}) {
  let bannertext = null;

  //   if (title === "Freelancer") {
  bannertext = (
    <>
      <div className={classes.Text}>
        <h2
          className={
            visibilityindex === currentindex ? classes.animateH2Text : ""
          }
        >
          {title}
        </h2>

        <p
          className={
            visibilityindex === currentindex ? classes.animatePText : ""
          }
        >
          {description}
        </p>
      </div>

      <img
        src={img}
        className={
          visibilityindex === currentindex
            ? [classes.MOC, classes.animateImage].join(" ")
            : classes.MOC
        }
        alt=""
      />
    </>
  );
  //   }
  return bannertext;
}

export default BannerContent;
