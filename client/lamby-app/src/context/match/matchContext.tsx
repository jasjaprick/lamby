import { createContext, useEffect, useState } from 'react';
import { IMatch } from '../../interfaces/interfaces';
import { api } from '../../services/apiClient';

type Props = {
  children: React.ReactNode;
}

type MatchContextState = {
  match: IMatch,
  matchPositions: any[]
  setMatchState: (newMatch: IMatch) => void;
}


// type Context = {
//   match: IMatch,
//   setMatch: Dispatch<SetStateAction<Context>>
// }

const initialState: MatchContextState = {
  match: {
    homeTeam: '',
    awayTeam: '',
    formation: '',
    date: '',
    venue: '',
  },
  matchPositions: [],
  setMatchState: () => {},
};

const MatchContext = createContext<MatchContextState>(initialState)

const MatchProvider = ({children}: Props): JSX.Element => {
  const [state, dispatch] = useState<any[]>(initialState.state);

  const setMatchState = (newMatch: IMatch) => dispatch([newMatch])

  useEffect(() => {
    async function getNextMatch(): Promise<void> {
      const result: IMatch = await api.getMatch();
      setMatchState(result);
    }
    getNextMatch();
  }, []);

  

  return (
    <MatchContext.Provider value={{state, setMatchState}}>
      {children}
    </MatchContext.Provider>
  )
}




export {MatchProvider, MatchContext}