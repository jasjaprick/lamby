export interface IMatch {
  id: number
  homeTeam: string
  awayTeam: string
  formation: string
  date: string
  venue: string
}

export interface ITimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface IMatchProp {
  match: IMatch
}

export interface IPlayerProp {
  player: IPosition
}

export interface IPosition {
  position: string
  instruction: string
  matchId: number
  userId: number
}


export interface IPlayer {
  id: number,
  firstName: string,
  lastName: string,
  playerNumber: number,
  goals: number,
  assists: number,
  matches: number
  defaultPosition: string
}

export interface Props {}

interface IAction<T> {
  type: T
}

export interface IUpdatePositionAction extends IAction<'UPDATE_POSITION'> {
  payload: {
    position: IPosition
  }
}

export interface IRefreshPositionsAction extends IAction<'REFRESH_POSITIONS'> {
  payload: {
    positions: IPosition[]
  }
}

export interface IRefreshMatchAction extends IAction<'REFRESH_MATCH'> {
  payload: {
    match: IMatch
  }
}

export interface IRefreshPlayersAction extends IAction<'REFRESH_PLAYERS'> {
  payload: {
    players: IPlayer[]
  }
}

export interface IAppStateValue {
  data: {
    match: IMatch
    positions: IPosition[]
    players: IPlayer[]
  }
}

export interface ICode {
  code: string,
  content: string
}
