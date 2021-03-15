import React from 'react';

function GameStatus({ status, onPlayAgain }) {
  return (
    <div className='game-done'>
      {status === 'won' ?
        <div className='message'>Nice!!</div> :
        <div className='message'>Game Over</div>
      }
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
}

export default GameStatus;
