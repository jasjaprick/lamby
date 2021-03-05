import { useState, useEffect} from 'react';
import { ITimeLeft, IMatchProp } from '../../interfaces/interfaces'

const Timer: React.FC<IMatchProp> = ({match}) => {
const [timeLeft, setTimeLeft] = useState<ITimeLeft>(countDownTimer());

useEffect(() => {
    setTimeout(() => {
      setTimeLeft(countDownTimer());
    }, 1000);
});

function countDownTimer(): ITimeLeft {
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
}

  return (
    <div>
      <span>
        {timeLeft.days}
        {timeLeft.days > 1 ? ' DAYS ' : ' DAY '}
      </span>
      <span>
        {timeLeft.hours}
        {timeLeft.hours > 1 ? ' HOURS ' : ' HOUR '}
      </span>
      <span>
        {timeLeft.minutes}
        {timeLeft.minutes > 1 ? ' MINS ' : ' MIN '}
      </span>
      <span>
        {timeLeft.seconds}
        {timeLeft.seconds > 1 ? ' SECS ' : ' SEC '}
      </span>
    </div>
  );
}

export default Timer
