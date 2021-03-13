import { useState, useEffect, useContext } from 'react';
import { ITimeLeft } from '../../interfaces/interfaces';
import { AppStateContext } from '../../context/AppContext';

const Timer: React.FC = () => {
  // Context Hook
  const { data } = useContext(AppStateContext);
  const match = data.match;
  console.log(match);

  // Function to get the values for the timer
  const countDownTimer = (): ITimeLeft => {
    const matchTime: number = new Date(match.date).getTime();
    const now: number = new Date().getTime();
    const diff: number = matchTime - now;
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (diff > 0) {
      timeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    return timeLeft;
  };

  // update the time left values to use in de
  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(countDownTimer());

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) setTimeLeft(countDownTimer());
    }, 1000);
    return () => {
      isMounted = false;
    };
  });
  return (
    <div className='timer'>
      <span data-testid='day'>
        {timeLeft.days}
        {timeLeft.days > 1 ? ' DAYS ' : ' DAY '}
      </span>
      <span data-testid='hour'>
        {timeLeft.hours}
        {timeLeft.hours > 1 ? ' HOURS ' : ' HOUR '}
      </span>
      <span data-testid='mins'>
        {timeLeft.minutes}
        {timeLeft.minutes > 1 ? ' MINS ' : ' MIN '}
      </span>
      <span data-testid='sec'>
        {timeLeft.seconds}
        {timeLeft.seconds > 1 ? ' SECS ' : ' SEC '}
      </span>
    </div>
  );
};

export default Timer;
