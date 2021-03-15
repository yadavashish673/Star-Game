import React from 'react';
import './App.css';
import Stars from './Star';
import Number from './Number';
import GameStatus from './GameStatus';
import { utils } from './utils/util';

class StarGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: utils.range(1, 9),
      currentStarCount: utils.random(1, 9),
      candidates: [],
      gameStatus: 'in-progress',
      timerCount: 10,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  startTimer() {
    const { timerCount, gameStatus } = this.state;

    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      const newTimerCount = timerCount - 1;

      if (newTimerCount >= 0 && gameStatus === 'in-progress') {
        this.setState({
          timerCount: newTimerCount,
          gameStatus: (newTimerCount === 0) ? 'lost' : gameStatus,
        });
      }
    }, 1000);
  }

  onNumberClick = (clickedNumber, btnStatus) => {
    const { available, currentStarCount, candidates, gameStatus } = this.state;

    if (btnStatus === 'used' || gameStatus !== 'in-progress') {
      return false;
    }

    const newCandidates = (btnStatus === 'available') ?
      candidates.concat(clickedNumber) :
      candidates.filter((cn) => cn !== clickedNumber);

    if (utils.sum(newCandidates) === currentStarCount) {
      const newAvailable = available.filter((an) => !newCandidates.includes(an));
      const gameStatus = (newAvailable.length === 0) ? 'won' : 'in-progress';

      this.setState({
        candidates: [],
        available: newAvailable,
        currentStarCount: utils.randomSumIn(newAvailable, 9),
        gameStatus,
      });

    } else {
      this.setState({
        candidates: newCandidates,
      });
    }
  };

  buttonStatus = (number) => {
    const { available, currentStarCount, candidates } = this.state;
    const isCandidateWrong = utils.sum(candidates) > currentStarCount;

    if (!available.includes(number)) {
      return 'used';
    }

    if (candidates.includes(number)) {
      return isCandidateWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  }

  render() {
    const { currentStarCount, gameStatus, timerCount } = this.state;
    const { startNewGame } = this.props;

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
                  status={this.buttonStatus(number)}
                  onClick={this.onNumberClick}
                />))
            }
          </div>
        </div>

        <div className='timer'>{`Time Remaining: ${timerCount}`}</div>

      </div>
    );
  }
}

export default StarGame;
