import React, { useReducer, useEffect, useContext, FC } from 'react';
import {
  AppStateContext,
  AppDispatchContext,
  defaultStateValue,
} from './AppContext';
import { reducer } from './reducer';
import { api } from '../services/apiClient';

interface Iprops {
  children: JSX.Element;
}

export const useStateDispatch = () => {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    throw new Error(
      'useStateDispatch was called outside of the AppDispatchContext provider'
    );
  }
  return dispatch;
};

const AppStateProvider: FC<Iprops> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultStateValue);

  useEffect(() => {
    async function getNextMatch(): Promise<void> {
      const result = await api.getMatch();
      dispatch({
        type: 'REFRESH_MATCH',
        payload: {
          match: result,
        },
      });
      const matchPositions = await api.getMatchPositions();
      dispatch({
        type: 'REFRESH_POSITIONS',
        payload: {
          positions: matchPositions,
        },
      });
    }

    getNextMatch();
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
