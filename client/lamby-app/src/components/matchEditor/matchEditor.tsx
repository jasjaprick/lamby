import React, { useContext, useState, useEffect } from 'react';
import './matchEditor.scss';
import { Link } from 'react-router-dom';
import { IPosition } from '../../interfaces/IPosition';
import { AppStateContext } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { useStateDispatch } from '../../context/AppState';


interface ICode {
  code: string;
  content: string;
}


const MatchEditor: React.FC = () => {
  const { data } = useContext(AppStateContext);
  const [position, setPosition] = useState('GK');
  const [playerId, setPlayerId] = useState(1);
  const [fade, setFade] = useState(true);
  const [count, setCount] = useState(1);
  const [finalInstruction, setFinalInstruction] = useState('gk-sb');
  const [instructions, setInstruction] = useState([
    { code: 'gk-sb', content: 'Goal keeper stay back' },
    { code: 'gk-jp', content: 'Goal keeper join play' },
  ]);
  const dispatch = useStateDispatch();
  const { players, match } = data;
  const positionCodes: ICode[] = [
    { code: 'GK', content: 'Goalkeeper' },
    { code: 'LB', content: 'Left Back' },
    { code: 'LCB', content: 'Left Center Back' },
    { code: 'RCB', content: 'Right Center Back' },
    { code: 'RB', content: 'Right Back' },
    { code: 'LDM', content: 'Left Defensive Mid' },
    { code: 'RDM', content: 'Right Defensive Mid' },
    { code: 'CAM', content: 'Central Attacking Mid' },
    { code: 'LW', content: 'Left Winger' },
    { code: 'ST', content: 'Striker' },
    { code: 'RW', content: 'Right Winger' },
  ];

  const getCurrentPosition = () => {
    return positionCodes.filter((pos) => pos.code === position);
  };
  const currentPos: any[] = getCurrentPosition();

  const instructionSelector = (position: string): ICode => {
    let instructions;
    switch (position) {
      case 'GK':
        instructions = [
          { code: 'gk gk-sb', content: 'Stay back' },
          { code: 'gk gk-jp', content: 'Join play' },
        ];
        break;
      case 'LCB':
        instructions = [
          { code: 'lcb lcb-sb', content: 'Stay back' },
          { code: 'lcb lcb-ja', content: 'Join attack' },
        ];
        break;
      case 'RCB':
        instructions = [
          { code: 'rcb rcb-sb', content: 'Stay back' },
          { code: 'rcb rcb-ja', content: 'Join attack' },
        ];
        break;
      case 'LB':
        instructions = [
          { code: 'lb lb-sb', content: 'Cut inside' },
          { code: 'lb lb-ja', content: 'Give crosses' },
        ];
        break;
      case 'RB':
        instructions = [
          { code: 'rb rb-ot', content: 'Cut inside' },
          { code: 'rb rb-sb', content: 'Give crosses' },
        ];
        break;
      case 'LDM':
        instructions = [
          { code: 'ldm ldm-ot', content: 'Cover center' },
          { code: 'ldm ldm-sb', content: 'Cover wing' },
        ];
        break;
      case 'RDM':
        instructions = [
          { code: 'rdm rdm-ot', content: 'Cover center' },
          { code: 'rdm rdm-sb', content: 'Cover wing' },
        ];
        break;
      case 'CAM':
        instructions = [
          { code: 'cam cam-ot', content: 'Free roam' },
          { code: 'cam cam-sb', content: 'Stay Back' },
        ];
        break;
      case 'LW':
        instructions = [
          { code: 'lw lw-ci', content: 'Cut inside' },
          { code: 'lw lw-sw', content: 'Stay wide' },
        ];
        break;
      case 'RW':
        instructions = [
          { code: 'rw rw-ot', content: 'Cut inside' },
          { code: 'rw rw-sb', content: 'Give crosses' },
        ];
        break;
      case 'ST':
        instructions = [
          { code: 'st st-ot', content: 'False 9' },
          { code: 'st st-sb', content: 'Give crosses' },
        ];
        break;
    }
    setInstruction(instructions);
    return instructions[0];
  };
  // END OF DATA VARS

  // OPTIONS INSTANTIATION
  const playerOptions: JSX.Element[] = [];

  for (const player of players) {
    playerOptions.push(
      <option key={player.id} value={player.id}>
        {player.firstName} {player.lastName}
      </option>
    );
  }

  const instructionOptions: JSX.Element[] = [];

  for (const instruction of instructions) {
    instructionOptions.push(
      <option key={instruction.code} value={instruction.code}>
        {instruction.content}
      </option>
    );
  }

  const positionChange = (num) => {
    const pos = positionCodes[num];
    const newPos = instructionSelector(pos.code);
    setPosition(pos.code);
    setFinalInstruction(newPos.code);
  };

  const oneUp = () => {
    setFade(true);
    if (count === 10) setCount(0);
    else setCount(count + 1);
    positionChange(count);
  };

  const oneDown = () => {
    setFade(true);
    if (count === 0) setCount(10);
    else setCount(count - 1);
    positionChange(count);
  };

  const handlePlayerChange = (e) => {
    setPlayerId(e.target.value);
  };

  const handleInstructionChange = (e) => {
    setFinalInstruction(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchPosition: IPosition = {
      matchId: match.id,
      userId: playerId,
      position: position,
      instruction: finalInstruction,
    };
    api.postMatchPosition(matchPosition);
    dispatch({
      type: 'UPDATE_POSITION',
      payload: {
        position: matchPosition,
      },
    });
    oneUp();
  };

  useEffect(() => {
    const animation = document.querySelector('.selector__content--inner');

    animation.addEventListener('animationend', () => {
      setFade(false);
    });
  }, []);

  // END OF CHANGE/SUBMIT HANDLERS

  return (
    <div>
      <header className='header'>
        <Link to='/match' className='back'>
          <img src='/img/chevron-left.svg' alt='back' />
        </Link>
        <h1>Edit Match</h1>
      </header>
      <div className='center-div center-div__editor'>
        <div className='selector__div'>
          <button onClick={oneDown} className='position-btn'>
            {' '}
            <img src='/img/chevron-left.svg' alt='previous' />
          </button>
          <div className='selector__content'>
            <h1 className={fade ? 'selector__content--inner' : ''}>
              {currentPos[0].content}
            </h1>
          </div>
          <button onClick={oneUp} className='position-btn'>
            {' '}
            <img src='/img/chevron-right.svg' alt='next' />
          </button>
        </div>

        <form id='match-form' className='player-form' onSubmit={handleSubmit}>
          <div className='select-wrapper'>
            <label htmlFor='player'>Player: </label>
            <br></br>
            <select
              name='player'
              id='players'
              onChange={handlePlayerChange}
              value={playerId}>
              {playerOptions}
            </select>
          </div>
          <div className='select-wrap'>
            <label htmlFor='instruction'>Instruction: </label>
            <br></br>
            <select
              name='instruction'
              id='instruction'
              onChange={handleInstructionChange}
              value={finalInstruction}>
              {instructionOptions}
            </select>
          </div>
          <br />
          <button className='btn hide-btn' type='submit'>
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default MatchEditor;
