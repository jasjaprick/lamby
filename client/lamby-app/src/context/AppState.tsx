import { useReducer, useEffect } from 'react'
import { AppStateContext, AppDispatchContext, defaultStateValue } from './AppContext'
import { reducer } from './reducer'
import { api } from '../services/apiClient'

const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStateValue)

  useEffect(() => {
    async function getNextMatch (): Promise<void> {
      const result = await api.getMatch()
      dispatch({
        type: 'REFRESH_MATCH',
        payload: {
          match: result
        }
      })
    }

    getNextMatch()
  }, [])

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
