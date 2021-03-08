export interface IMatch {
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

export interface IPosition {
  position: string
  instruction: string
  instructionClass: string
  matchId: number
  userId: number
}

interface IAction<T> {
  type: T
}

export interface IUpdatePositionAction extends IAction<'UPDATE_POSITION'> {
  payload: {
    position: IPosition
  }
}

export interface IRefreshMatchAction extends IAction<'REFRESH_MATCH'> {
  payload: {
    match: IMatch
  }
}

export interface IAppStateValue {
  data: {
    match: IMatch
    positions: IPosition[]
  }
}
