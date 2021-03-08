import { createContext } from 'react'
import {
  IUpdatePositionAction,
  IAppStateValue,
  IRefreshMatchAction
} from '../interfaces/interfaces'

export const defaultStateValue = {
  data: {
    match: {
      homeTeam: '',
      awayTeam: '',
      formation: '',
      date: '',
      venue: ''
    },
    positions: [
      {
        position: '',
        instruction: '',
        instructionClass: '',
        matchId: 0,
        userId: 0
      }
    ]
  }
}

export const AppStateContext = createContext<IAppStateValue>(defaultStateValue)

export const AppDispatchContext = createContext<
React.Dispatch<IUpdatePositionAction | IRefreshMatchAction> | undefined
>(undefined)
