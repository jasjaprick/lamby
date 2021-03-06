import { useState, useEffect } from 'react'
import { IMatch } from './interfaces/interfaces'
import './App.scss'
import { api } from './services/apiClient'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './containers/home/Home'
import Match from './containers/match/Match'
import Profile from './containers/profile/Profile'
import {MatchProvider} from './context/match/matchContext'

function App () {
  const [match, setMatch] = useState<IMatch>({
    homeTeam: '',
    awayTeam: '',
    formation: '',
    date: '',
    venue: ''
  })

  console.log(match)

  useEffect(() => {
    async function getNextMatch (): Promise<void> {
      const result: IMatch = await api.getMatch()
      setMatch(result)
    }

    getNextMatch()
  }, [])

  return (
    <MatchProvider>
      <div className='App'>
        <Router>
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
            <Route path='/match'>
              <Match />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
        </Router>
      </div>
    </MatchProvider>
  );
}

export default App
