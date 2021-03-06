import React from 'react'
import Timer from '../../components/timer/Timer'
import { IMatchProp } from '../../interfaces/interfaces'

const Home: React.FC<IMatchProp> = ({ match }) => {
  return (
    <div>
      <h1>{match.homeTeam}</h1>
      <h4>vs</h4>
      <h1>{match.awayTeam}</h1>
      <h4>{match.venue}</h4>
      {match && <Timer match={match} />}
    </div>
  )
}

export default Home
