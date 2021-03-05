import { useState, useEffect } from 'react';
import { IMatch } from './interfaces/interfaces';
import './App.scss';
import { api } from './services/apiClient';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './containers/home/Home';
import Match from './containers/match/Match';


function App() {
  const [match, setMatch] = useState<IMatch>({
    homeTeam: '',
    awayTeam: '',
    formation: '',
    date: '',
    venue: '',
  });
  
  useEffect(() => {
    async function getNextMatch(): Promise<void> {
      const result: IMatch = await api.getMatch();
      setMatch(result);
    }

    getNextMatch();
  }, []);
  
  return (
    <Router>
      <div className='App'>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/match'>Match</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/'>
            <Home match={match} />
          </Route>
          <Route path='/match' component={Match} >
            <Match />
          </Route>
          <Route path='/profile'>
            <h1>Profile</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
