import { useEffect, useContext, useReducer } from 'react'
import { api } from '../../services/apiClient'
import { Link } from 'react-router-dom'
import { reducer } from '../../context/reducer';
import { AppStateContext, defaultStateValue } from '../../context/AppContext';
import Player from '../player/Player';



const MatchDisplay: React.FC = () => {
  const[state, dispatch] = useReducer(reducer, defaultStateValue);
  const {positions, match, players } = state.data


   useEffect(() => {
     async function getNextMatch(): Promise<void> {
       const matchPositions = await api.getMatchPositions();
      dispatch({
        type: 'REFRESH_POSITIONS',
        payload: {
          positions: matchPositions
        }
      })

    }

     getNextMatch();

   }, []);

   const matchInfoKnown = positions.map((position) => {
        return <Player player={position}/>;
      })

   const matchInfoUnknown = <h1>Match Info TBD</h1>;
   

  return (
    <div>
      <Link to='/match/edit'>Edit</Link>
      <h1>Match</h1>
      {positions.length > 10 ?  matchInfoKnown : matchInfoUnknown}
    </div>
  );
}

export default MatchDisplay