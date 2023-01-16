import { useState, useEffect } from "react";
import "./App.css";

type Players = "O" | "X";
type PlaysRegistry = { [key: string]: Players };

function App() {
  const [turn, setTurn] = useState("O");
  const [register, setRegister] = useState<PlaysRegistry>({});
  const [winner, setWinner] = useState<Players | null>(null);
  const [tie, setTie] = useState<boolean | null>(null);
  const gameOver = winner || tie;

  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) => {
    if (register[index] || gameOver) {
      return;
    }
    setRegister((previousState) => ({
      ...previousState,
      [index]: turn,
    }));
    setTurn((previousState) => (previousState === "O" ? "X" : "O"));
    checkGameEnd();
  };

  const getCellPlayer = (index: number) => {
    if (!register[index]) {
      return;
    }
    return register[index];
  };

// TODO : Refactor GameEnd Logic -> Check lines, Columns and diagonals*
  const checkGameEnd = () => {
    let sum_O = 0;
    let sum_X = 0;
    for (let index = 0; index < 9; index++) {
      if (register[index] === "O") {
        sum_O += index + 1;
        if (sum_O === 15) {
          return "O";
        }
      }
      if (register[index] === "X") {
        sum_X += index + 1;
        if (sum_X === 15) {
          return "X";
        }
      }
    }
  };

  const checkTie = () => {
    if (Object.keys(register).length === 9) {
      setTie(() => true);
    }
  };

  const resetGame = () => {
    setRegister(() => ({}));
    setWinner(() => null);
    setTie(() => null);
  };

  useEffect(() => {
    const winner = checkGameEnd();
    if (winner) {
      setWinner(winner);
    }
    checkTie()
  }, [register]);

  return (
    <div className="container">
      {winner && <h1>{winner} is the WINNER !!!</h1>}
      {tie && <h1>DRAW!</h1>}
      <button onClick={resetGame}>{gameOver ? "Play Again" : "Reset Game"}</button>
      {!winner && <p>It's {turn}'s turn.</p>}

      <div className={`board ${gameOver ? "gameOver" : null}`}>
        {getSquares().map((_, index) => (
          <div
            key={index}
            className={`cell ${getCellPlayer(index)}`}
            onClick={() => play(index)}
          >
            {register[index]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
