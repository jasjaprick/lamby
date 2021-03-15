import React from 'react';
import { useEffect, useReducer, useContext, useState } from 'react';
import './matchDisplay.scss';
import { api } from '../../services/apiClient';
import { Link, Router } from 'react-router-dom';
import { reducer } from '../../context/reducer';
import { AppStateContext, defaultStateValue } from '../../context/AppContext';
import Player from '../player/Player';
import { IPlayerPosition } from '../../interfaces/interfaces';

const instructionsArray: IPlayerPosition[] = [
  { code: 'GK', move: 'gk-sb', content: 'Goal keeper stay back' },
  { code: 'GK', move: 'gk-jp', content: 'Goal keeper join play' },
  { code: 'LCB', move: 'lcb-sb', content: 'Stay back during the game' },
  { code: 'LCB', move: 'lcb-ja', content: 'Join attack whenever possible' },
  { code: 'RCB', move: 'rcb-sb', content: 'Stay back during the game' },
  { code: 'RCB', move: 'rcb-ja', content: 'Join the attack whenever possible' },
  {
    code: 'LB',
    move: 'lb-sb',
    content: 'Go wide and give crosses on attacking runs',
  },
  { code: 'LB', move: 'lb-ja', content: 'Cut inside when joining the attack' },
  {
    code: 'RB',
    move: 'rb-ja',
    content: 'Go wide and give crosses on attacking runs',
  },
  { code: 'RB', move: 'rb-sb', content: 'Cut inside when joining the attack' },
  { code: 'LDM', move: 'ldm-ot', content: 'Cover center' },
  { code: 'LDM', move: 'ldm-sb', content: 'Cover wing' },
  { code: 'RDM', move: 'rdm-ot', content: 'Cover center' },
  { code: 'RDM', move: 'rdm-sb', content: 'Cover wing' },
  { code: 'CAM', move: 'cam-ot', content: 'Free roam' },
  { code: 'CAM', move: 'cam-sb', content: 'Stay Back' },
  { code: 'LW', move: 'lw-sw', content: 'Stay wide and give crosses' },
  {
    code: 'LW',
    move: 'lw-ci',
    content: 'Cut inside and go for the action',
  },
  { code: 'RW', move: 'rw-sw', content: 'Stay wide and give crosses' },
  {
    code: 'RW',
    move: 'rw-ci',
    content: 'Cut inside and go for the action',
  },
  {
    code: 'ST',
    move: 'st-ot',
    content: 'Drop back and act like a false 9',
  },
  {
    code: 'ST',
    move: 'st-sb',
    content: "Make runs and get in behind the opponent's defense",
  },
];

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
        for (let i = 0; i < instructionsArray.length; i++) {
          if (pos.position === instructionsArray[i].code) {
            return (
              <Player
                key={pos.userId}
                player={pos.userId}
                updateView={handlePlayerChange}
                instruction={instructionsArray[i]}
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

  console.log('posLen', positions.length);
  console.log('dis', dispatch)

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
