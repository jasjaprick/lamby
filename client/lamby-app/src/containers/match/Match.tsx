import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MatchEditor from '../../components/matchEditor/matchEditor';
import MatchDisplay from '../../components/matchDisplay/matchDisplay';
import { api } from '../../services/apiClient';
import { useStateDispatch } from '../../context/AppState';

const Match: React.FC = () => {
  const dispatch = useStateDispatch();

  useEffect(() => {
    async function getAllPlayers(): Promise<void> {
      const result = await api.getPlayers();
      dispatch({
        type: 'REFRESH_PLAYERS',
        payload: {
          players: result,
        },
      });
    }

    getAllPlayers();
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path='/match/edit'>
            <MatchEditor />
          </Route>
          <Route path='/match'>
            <MatchDisplay />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Match;
