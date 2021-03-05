import { useState, useEffect } from 'react';
import { Match } from './interfaces/interfaces';
import './App.scss';
import { api } from './services/apiClient';
import { Timer } from './components/timer/Timer'


function App() {
  const [match, setMatch] = useState<Match>({
    homeTeam: '',
    awayTeam: '',
    formation: '',
    date: '',
    venue: '',
  });
  
  useEffect(() => {
    async function getNextMatch(): Promise<void> {
      const result: Match = await api.getMatch();
      setMatch(result);
    }

    getNextMatch();
  }, []);
  
  return (
    <div className='App'>
      <h1>{match.homeTeam}</h1>
      <h4>vs</h4>
      <h1>{match.awayTeam}</h1>
      <h4>{match.venue}</h4>
      {match && <Timer match={match} />}
    </div>
  );
}

export default App;
