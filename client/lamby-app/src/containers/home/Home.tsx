import './Home.scss'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import Timer from '../../components/timer/Timer'
import { AppStateContext } from '../../context/AppContext'

const Home: React.FC = () => {
  const { data } = useContext(AppStateContext)
  const match = data.match

  return (
    <div className='home-wrapper'>
      <header className='header'>
        <h1>HOME</h1>
      </header>
      <div className='home center-div'>
        <h1>{match.homeTeam}</h1>
        <h4>vs</h4>
        <h1>{match.awayTeam}</h1>
        <h4>{match.venue}</h4>
        {match && <Timer />}
        <Link to='/match/edit' className='btn main-btn'>EDIT MATCH</Link>
      </div>
    </div>
  );
}

export default Home
