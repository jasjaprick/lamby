import {Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import MatchDisplay from './matchDisplay';
import {AppStateContext }from '../../context/AppContext';

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


const mockPlayerPositions = {data: { positions: [
  {
    position: 'GK',
    instruction: '',
    matchId: 0,
    userId: 0,
  },
  {
    position: 'LCB',
    instruction: '',
    matchId: 0,
    userId: 1,
  },
  {
    position: 'RCB',
    instruction: '',
    matchId: 0,
    userId: 2,
  },
  {
    position: 'LB',
    instruction: '',
    matchId: 0,
    userId: 3,
  },
  {
    position: 'RB',
    instruction: '',
    matchId: 0,
    userId: 4,
  },
  {
    position: 'LDM',
    instruction: '',
    matchId: 0,
    userId: 5,
  },
  {
    position: 'RDM',
    instruction: '',
    matchId: 0,
    userId: 6,
  },
  {
    position: 'LW',
    instruction: '',
    matchId: 0,
    userId: 7,
  },
  {
    position: 'RW',
    instruction: '',
    matchId: 0,
    userId: 8,
  },
  {
    position: 'ST',
    instruction: '',
    matchId: 0,
    userId: 9,
  },
  {
    position: 'ST',
    instruction: '',
    matchId: 0,
    userId: 10,
  }
]
}};



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

const mockPlayerPositionsEdit = {data: { positions: [
  {
    position: 'GK',
    instruction: '',
    matchId: 0,
    userId: 0,
  },
  {
    position: 'LCB',
    instruction: '',
    matchId: 0,
    userId: 1,
  },
  {
    position: 'RCB',
    instruction: '',
    matchId: 0,
    userId: 2,
  },
  {
    position: 'LB',
    instruction: '',
    matchId: 0,
    userId: 3,
  },
  {
    position: 'RB',
    instruction: '',
    matchId: 0,
    userId: 4,
  },
  {
    position: 'LDM',
    instruction: '',
    matchId: 0,
    userId: 5,
  },
  {
    position: 'RDM',
    instruction: '',
    matchId: 0,
    userId: 6,
  }
]
}};