import styles from "./Keyboard.module.css";
type KeyboardProps = {
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};
const Keyboard = ({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
}: KeyboardProps) => {
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
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`${styles.btn} ${isActive ? styles.active : ""} ${
              isInactive ? styles.isInactive : ""
            }`}
            disabled ={isInactive || isActive}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
