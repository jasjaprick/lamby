//Components: ApiClient
export interface IMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  formation: string;
  date: string;
  venue: string;
}


export interface IPosition {
  position: string;
  instruction: string;
  matchId: number;
  userId: number;
}


//Components: Player & Match display
export interface IPlayerPosition {
  code: string;
  move: string;
  content: string;
}

export interface IPlayer {
  id: number;
  firstName: string;
  lastName: string;
  playerNumber: number;
  goals: number;
  assists: number;
  matches: number;
  defaultPosition: string;
}

// export interface Props {}

interface IAction<T> {
  type: T;
}

export interface IUpdatePositionAction extends IAction<'UPDATE_POSITION'> {
  payload: {
    position: IPosition;
  };
}

export interface IRefreshPositionsAction extends IAction<'REFRESH_POSITIONS'> {
  payload: {
    positions: IPosition[];
  };
}

export interface IRefreshMatchAction extends IAction<'REFRESH_MATCH'> {
  payload: {
    match: IMatch;
  };
}

export interface IRefreshPlayersAction extends IAction<'REFRESH_PLAYERS'> {
  payload: {
    players: IPlayer[];
  };
}

export interface IRefreshPlayerName extends IAction<'REFRESH_NAME'> {
  payload: {
    playerName: string;
  };
}

export interface IRefreshInstruction extends IAction<'REFRESH_INSTRUCTION'> {
  payload: {
    instruction: string;
  };
}

export interface IAppStateValue {
  data: {
    match: IMatch;
    positions: IPosition[];
    players: IPlayer[];
    playerName: string;
    instruction: string;
  };
}

export interface ICode {
  code: string;
  content: string;
}
