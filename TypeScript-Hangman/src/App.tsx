import { useState, useCallback, useEffect } from "react";
import words from "./wordList.json";
import HangmanDrawing from "./HangmanDrawing";
import Keyboard from "./Keyboard";
import HangmanWord from "./HangmanWord";


function App() {
  /** The code below returns a random word from our wordlist and tracks the word being used */
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  //array of strings to track the letter being guessed as game goes on
  const [guessedLetters, setGuessedLetter] = useState<string[]>([]);

  /** Returns the incorrect letters that are NOTin the word the user is trying to guess  */
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  console.log(wordToGuess);

  /** The main purpose of this function is to add the guessed letter inputed by the user to the array of guessed letters.
   * UsecallBack is being used here to prevent it from being reran everytime our component is rendered. Now, it will only render when
   * the guessed letters change.
   */
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter)) return;

      //takes the current letters in the array and adds the new letter to them using spread operator
      setGuessedLetter((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters]
  );

  /**This handles all of the keypresses. 
  It first checks if the key pressed is within a-z. If so it takes whatever key is pressed and adds it to the guessed letters.**/
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return; // this is a regular expression that checks if the key pressed is within a-z.

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => document.removeEventListener("keypress", handler);
  }, [guessedLetters]);

  //These styles serve as a wrapper for everrything in our app in a sense.
  return (
    <div
      style={{
        
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Lose Win</div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}

          inactiveLetters = {incorrectLetters}
          addGuessedLetter  = {addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
