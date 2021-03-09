import { useContext } from 'react'
import Timer from '../../components/timer/Timer'
import { AppStateContext } from '../../context/AppContext'

const Home: React.FC = () => {
  const { data } = useContext(AppStateContext)
  const match = data.match

  return (
    <div>
      <h1>{match.homeTeam}</h1>
      <h4>vs</h4>
      <h1>{match.awayTeam}</h1>
      <h4>{match.venue}</h4>
      {match && <Timer />}
    </div>
  )
}

export default Home
