import React, { useState } from 'react';
import StarGame from './StarGame';
import StarGameWithHooks from './StarGameWithHooks';

function App() {

  const [count, setCount] = useState(0);

  const handleStartNewGame = () => {
    setCount(count + 1);
  };

  return (
    <>
      <StarGame key={count} startNewGame={handleStartNewGame} />
      <StarGameWithHooks key={count + 200} startNewGame={handleStartNewGame} />
    </>
  );
}

export default App;
