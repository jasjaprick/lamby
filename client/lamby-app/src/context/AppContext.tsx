import { createContext } from 'react'
import {
  IUpdatePositionAction,
  IAppStateValue,
  IRefreshMatchAction,
  IRefreshPlayersAction
} from '../interfaces/interfaces'

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
  },
};

export const AppStateContext = createContext<IAppStateValue>(defaultStateValue)

export const AppDispatchContext = createContext<
React.Dispatch<IUpdatePositionAction | IRefreshMatchAction | IRefreshPlayersAction> | undefined
>(undefined)
