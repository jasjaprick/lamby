import {Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Home from '../../containers/home/Home';
import Profile from '../../containers/profile/Profile';
import {AppStateContext }from '../../context/AppContext';
import MatchDisplay from '../matchDisplay/matchDisplay';
import {mockPlayerPositions} from '../matchDisplay/matchDisplay.mocks';

//TEST 1
test('rendering home', async () => {
  const history = createMemoryHistory();
  const route = '/home';
  history.push(route);

  render(
     <Router history={history}>
    <Home />
    </Router> 
  )
   expect(screen.getByText(/Home/i)).toBeInTheDocument()
});

//TEST 2
test('rendering profile', async () => {
  const history = createMemoryHistory();
  const route = '/profile';
  history.push(route);

  render(
    <Router history={history}>
    <Profile />
    </Router> 
  )
   expect(screen.getByText(/Profile/i)).toBeInTheDocument()
});

//TEST 3
test('rendering match ', async () => {
  const history = createMemoryHistory();
  const route = '/match';
  history.push(route);

  render(
    <AppStateContext.Provider value={mockPlayerPositions} >
    <Router history={history}>
      <MatchDisplay />
    </Router> 
    </AppStateContext.Provider>
  )
   expect(screen.getByText(/Match/i)).toBeInTheDocument()
});


