import {Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import MatchDisplay from './matchDisplay';
import {AppStateContext }from '../../context/AppContext';
import {mockPlayerPositions} from '../matchDisplay/matchDisplay.mocks'
import {mockPlayerPositionsEdit} from '../matchDisplay/matchDisplay.mocks'


//TEST 1
test('rendering macth if there are 11 players', async () => {
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

  const totalPlayers = await screen.findAllByTestId('player-number-text');
  expect(totalPlayers).toHaveLength(11);
})


//TEST 2
test('rendering match edit if there are less than 11 players', async () => {
  const history = createMemoryHistory();
  const route = '/match/edit';
  history.push(route);

  render(
    <AppStateContext.Provider value={mockPlayerPositionsEdit}  >
    <Router history={history}>
    <MatchDisplay />
    </Router> 
    </AppStateContext.Provider>
  )
   expect(screen.getByText(/Match Info/i)).toBeInTheDocument()

})

