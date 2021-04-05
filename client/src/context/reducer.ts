import {
  IAppStateValue,
  IUpdatePositionAction,
  IRefreshMatchAction,
  IRefreshPlayersAction,
  IRefreshPositionsAction,
  IRefreshPlayerName,
  IRefreshInstruction
} from '../interfaces/interfaces'

export const reducer = (
  state: IAppStateValue,
  action: IUpdatePositionAction | IRefreshPositionsAction | IRefreshMatchAction | IRefreshPlayersAction | IRefreshPlayerName | IRefreshInstruction
) => {
  switch (action.type) {
    case 'REFRESH_MATCH': {
      const match = action.payload.match;
      return {
        ...state,
        data: { ...state.data, match: match },
      };
    }

    case 'REFRESH_POSITIONS': {
      const positions = action.payload.positions;
      return {
        ...state,
        data: { ...state.data, positions: [...positions] },
      };
    }

    case 'UPDATE_POSITION': {
      const newPosition = state.data.positions.map((position) => {
        if (position.userId === action.payload.position.userId) {
          position = action.payload.position;
        }
        return position;
      });
      return {
        ...state,
        data: {
          ...state.data,
          positions: [...newPosition],
        },
      };
    }

    case 'REFRESH_PLAYERS': {
      const newPlayers = action.payload.players;

      return {
        ...state,
        data: {
          ...state.data,
          players: [...newPlayers],
        },
      };
    }

    case 'REFRESH_NAME': {
      const playerName = action.payload.playerName;

      return {
        ...state,
        data: {
          ...state.data,
          playerName: playerName,
        },
      };
    }
    case 'REFRESH_INSTRUCTION': {
      const instruction = action.payload.instruction;

      return {
        ...state,
        data: {
          ...state.data,
          instruction: instruction,
        },
      };
    }

    default: {
      throw new Error('Unhandled action type'); // TODO Insert ${action.type}
    }
  }
}
