import { useState, useEffect } from 'react';
import { utils } from './utils/util';


export default function useGameState() {
  const [available, setAvailable] = useState(utils.range(1, 9));
  const [currentStarCount, setCurrentStarCount] = useState(utils.random(1, 9));
  const [candidates, setCandidates] = useState([]);
  const [gameStatus, setGameStatus] = useState('in-progress');
  const [timerCount, setTimerCount] = useState(10);

  /**
   * If you’re familiar with React class lifecycle methods, you can think of 
   * useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
   */
  useEffect(() => {
    const onTimeout = () => {
      clearTimeout(timeout);
      const newTimerCount = timerCount - 1;
      if (newTimerCount >= 0 && gameStatus === 'in-progress') {

        const updatedGameStatus = (newTimerCount === 0) ? 'lost' : gameStatus;
        setTimerCount(newTimerCount);
        setGameStatus(updatedGameStatus);
      }
    };

    let timeout = setTimeout(onTimeout, 1000);

    return () => {
      clearTimeout(timeout);
    };

  }, [timerCount, gameStatus]);

  const setGameState = (newCandidates) => {
    if (utils.sum(newCandidates) === currentStarCount) {
      const newAvailable = available.filter((an) => !newCandidates.includes(an));
      const gameStatus = (newAvailable.length === 0) ? 'won' : 'in-progress';

      setCandidates([]);
      setAvailable(newAvailable);
      setCurrentStarCount(utils.randomSumIn(newAvailable, 9));
      setGameStatus(gameStatus);

    } else {
      setCandidates(newCandidates);
    }
  }

  return { available, currentStarCount, candidates, gameStatus, timerCount, setGameState }
}