import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import React from 'react';
import Home from './containers/home/Home';
import Match from './containers/match/Match';
import Profile from './containers/profile/Profile';
import AppStateProvider from './context/AppState';
import MatchEditor from './components/matchEditor/matchEditor';

function App() {
  return (
    <AppStateProvider>
      <div className='App'>
        <Router>
          <nav className='navbar'>
            <ul>
              <li>
                <NavLink to='/home' activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/match' activeClassName='active'>
                  Match
                </NavLink>
              </li>
              <li>
                <NavLink to='/profile' activeClassName='active'>
                  Profile
                </NavLink>
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
            <Route path='/home'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppStateProvider>
  );
}

export default App;
