import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const getSquares = () => {
    return new Array(9).fill(true);
  }

  return (
    <div className="container">
      <div className="board">
        {getSquares().map((_, i) => (
          <div className='cell'>X</div>
          ))}
        </div>
    </div>
  )
}

export default App
