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

  const checkRows = () => {
    for (let firstElement = 0; firstElement < 9; firstElement += 3) {
      if (
        register[firstElement] &&
        register[firstElement] === register[firstElement + 1] &&
        register[firstElement] === register[firstElement + 2]
      ) {
        return register[firstElement];
      }
    }
  };

  const checkColumns = () => {
    for (let firstElement = 0; firstElement < 3; firstElement += 1) {
      if (
        register[firstElement] &&
        register[firstElement] === register[firstElement + 3] &&
        register[firstElement] === register[firstElement + 6]
      ) {
        return register[firstElement];
      }
    }
  };

  const checkDiaigonals = () => {
    if (
      (register[4] === register[0] && register[4] === register[8]) ||
      (register[4] === register[2] && register[4] === register[6])
    ) {
      return register[4];
    }
  };

  const checkGameEnd = () => {
    if (checkRows()) {
      return checkRows();
    }
    if (checkColumns()) {
      return checkColumns();
    }
    if (register[4]) {
      return checkDiaigonals();
    }
  };

  const checkTie = () => {
    if (Object.keys(register).length === 9) {
      setTie(() => true);
    }
  };

  const resetGame = () => {
    setTurn(() => (register[0] === "O" ? "X" : "O"));
    setRegister(() => ({}));
    setWinner(() => null);
    setTie(() => null);
  };

  useEffect(() => {
    const winner = checkGameEnd();
    if (winner) {
      setWinner(winner);
    }
    checkTie();
  }, [register]);

  return (
    <div className="container">
      <h1 className="title">TIC TAC TOE !!!</h1>
      {winner && <h1>{winner} is the WINNER !!!</h1>}
      {tie && <h1>DRAW!</h1>}
      <button onClick={resetGame}>
        {gameOver ? "Play Again" : "Reset Game"}
      </button>
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
