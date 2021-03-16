import React from 'react';
import { useEffect, useReducer, useContext, useState } from 'react';
import './matchDisplay.scss';
import { api } from '../../services/apiClient';
import { Link } from 'react-router-dom';
import { reducer } from '../../context/reducer';
import { AppStateContext, defaultStateValue } from '../../context/AppContext';
import Player from '../player/Player';
import InstructionsPlayer from '../Helpers/InstructionsPlayers';


const MatchDisplay: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultStateValue);
  const [lastName, setLastName] = useState('Select Player');
  const [instruc, setInstruc] = useState('By clicking on a dot');

  const context = useContext(AppStateContext);
  const { positions } = context.data;

  useEffect(() => {
    async function getNextMatch(): Promise<void> {
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

  const handlePlayerChange = (Pname: string, Pinstruc: string): void => {
    setLastName(Pname);
    setInstruc(Pinstruc);
  };

  const matchInfoKnown = (
    <div className='pitch'>
      {positions.map((pos): any => {
        for (let i = 0; i < InstructionsPlayer.length; i++) {
          if (pos.position === InstructionsPlayer[i].code) {
            return (
              <Player
                key={pos.userId}
                player={pos.userId}
                updateView={handlePlayerChange}
                instruction={InstructionsPlayer[i]}
              />
            );
          }
        }
      })}
    </div>
  );

  const matchInfoUnknown = (
    <div className='center-div home'>
      <h1>Match Info TBD</h1>
    </div>
  );

  return (
    <div className='match-display' data-testid="player">
      <header className='header'>
        <h1>Match</h1>
     
        <Link to='/match/edit' className='edit'>
          <img src='/img/edit.svg' alt='edit' />
        </Link>
      
      </header>
      <div className='p-1'></div>
      <div >{positions.length < 10 ? matchInfoUnknown : matchInfoKnown}</div>
      <div className='p-1 text-center'>
        <h1 className=''>{lastName}</h1>
        <p className=''>{instruc}</p>
      </div>
    </div>
  );
};

export default MatchDisplay;
