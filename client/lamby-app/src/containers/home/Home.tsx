import { useContext, useEffect } from 'react'
import Timer from '../../components/timer/Timer'
import {MatchContext} from '../../context/match/matchContext'
import { IMatch } from '../../interfaces/interfaces'
import {api } from '../../services/apiClient'

const Home: React.FC = () => {
  const matchContext = useContext(MatchContext)

  

  console.log(matchContext)

  return (
    <div>
      {/* <h1>{matchContext.state[0].homeTeam}</h1>
      <h4>vs</h4>
      <h1>{matchContext.state[0].awayTeam}</h1>
      <h4>{matchContext.state[0].venue}</h4> */}
      {/* {matchContext && <Timer  />} */}
    </div>
  );
}



export default Home
