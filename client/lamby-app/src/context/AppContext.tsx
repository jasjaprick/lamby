import { createContext } from 'react'
import {IAppStateValue } from '../interfaces/IAppStateValue';
import {IUpdatePositionAction} from '../interfaces/IUpdatePositionAction';
import {IRefreshMatchAction } from '../interfaces/IRefreshMatchAction';
import {IRefreshPlayersAction } from '../interfaces/IRefreshPlayersAction';


export const defaultStateValue: IAppStateValue = {
  data: {
    match: {
      id: 0,
      homeTeam: '',
      awayTeam: '',
      formation: '',
      date: '',
      venue: '',
    },
    positions: [
      {
        position: '',
        instruction: '',
        matchId: 0,
        userId: 0,
      },
    ],
    players: [
      {
        id: 0,
        firstName: '',
        lastName: '',
        playerNumber: 0,
        goals: 0,
        assists: 0,
        matches: 0,
        defaultPosition: ''
      },
    ],
    playerName: 'Select Position',
    instruction: 'By clicking on a dot'
  },
};

export const AppStateContext = createContext<IAppStateValue>(defaultStateValue)

export const AppDispatchContext = createContext<
React.Dispatch<IUpdatePositionAction | IRefreshMatchAction | IRefreshPlayersAction> | undefined
>(undefined)
