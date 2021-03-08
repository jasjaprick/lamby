import {
  IAppStateValue,
  IUpdatePositionAction,
  IRefreshMatchAction
} from '../interfaces/interfaces'

export const reducer = (
  state: IAppStateValue,
  action: IUpdatePositionAction | IRefreshMatchAction
) => {
  switch (action.type) {
    case 'REFRESH_MATCH': {
      const match = action.payload.match
      return {
        ...state, data: { ...state.data, match: match }
      }
    }

    case 'UPDATE_POSITION': {
      const newPosition = action.payload.position

      return {
        ...state,
        data: {
          ...state.data,
          positions: [...state.data.positions, newPosition]
        }
      }
    }

    default: {
      throw new Error('Unhandled action type') // TODO Insert ${action.type}
    }
  }
}
