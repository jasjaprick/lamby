import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
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
         <NavBar/>
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
