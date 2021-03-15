import React from 'react';
import './App.css';
import Stars from './Star';
import Number from './Number';
import GameStatus from './GameStatus';
import { utils } from './utils/util';
import useGameState from './useGameState';

function StarGame(props) {
  // custom hooks
  const { available, currentStarCount, candidates, gameStatus, timerCount, setGameState } = useGameState();
  const { startNewGame } = props;

  const onNumberClick = (clickedNumber, btnStatus) => {
    if (btnStatus === 'used' || gameStatus !== 'in-progress') {
      return false;
    }

    const newCandidates = (btnStatus === 'available') ?
      candidates.concat(clickedNumber) :
      candidates.filter((cn) => cn !== clickedNumber);

    setGameState(newCandidates);
  };


  const buttonStatus = (number) => {
    const isCandidateWrong = utils.sum(candidates) > currentStarCount;

    if (!available.includes(number)) {
      return 'used';
    }

    if (candidates.includes(number)) {
      return isCandidateWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  }

  return (
    <div className="game" >

      <div className="body">

        <div className='left'>
          {gameStatus === 'in-progress' ?
            <Stars count={currentStarCount} /> :
            <GameStatus status={gameStatus}
              onPlayAgain={startNewGame} />
          }
        </div>

        <div className='right'>
          {
            utils.range(1, 9).map((number) => (
              <Number
                key={number}
                number={number}
                status={buttonStatus(number)}
                onClick={onNumberClick}
              />))
          }
        </div>

      </div>

      <div className='timer'>{`Time Remaining: ${timerCount}`}</div>

    </div>
  );
}


export default StarGame;
