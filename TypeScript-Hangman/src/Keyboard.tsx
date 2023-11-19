import React from "react";
import styles from "./Keyboard.module.css"
const Keyboard = () => {
  const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
        {/** Maps each letter from KEYS array as a button on to the screen */}
      {KEYS.map((key) => {
        return <button className={styles.btn} key={key}>{key}</button>;
      })}
    </div>
  );
};

export default Keyboard;
