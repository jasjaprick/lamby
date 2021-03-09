import './App.scss'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './containers/home/Home'
import Match from './containers/match/Match'
import Profile from './containers/profile/Profile'
import AppStateProvider from './context/AppState'
import MatchEditor from './components/matchEditor/matchEditor'

function App () {

  return (
    <AppStateProvider>
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
            <Route path='/match/edit'>
              <MatchEditor />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppStateProvider>
  );
}

export default App
