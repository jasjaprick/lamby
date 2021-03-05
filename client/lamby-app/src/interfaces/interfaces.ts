
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
  match: IMatch;
}