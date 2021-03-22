import React, { useContext, useState, useEffect } from 'react';
import './matchEditor.scss';
import { Link } from 'react-router-dom';
import { IPosition } from '../../interfaces/IPosition';
import { AppStateContext } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { useStateDispatch } from '../../context/AppState';
import positionCodes from '../../Instructions_&_Positions/PositionCodes';
import instructionSelector from '../../Instructions_&_Positions/InstructionSelector';


const MatchEditor: React.FC = () => {
  const { data } = useContext(AppStateContext);
  const [position, setPosition] = useState('GK');
  const [playerId, setPlayerId] = useState(1);
  const [fade, setFade] = useState(true);
  const [count, setCount] = useState(0);
  const [finalInstruction, setFinalInstruction] = useState('gk-sb');
 

  const [instructions, setInstruction] = useState([
    { code: 'gk-sb', content: 'Goal keeper stay back' },
    { code: 'gk-jp', content: 'Goal keeper join play' },
  ]);

  const dispatch = useStateDispatch();
  const { players, match } = data;

  const getCurrentPosition = () => {
    return positionCodes.filter((pos) => pos.code === position);
  };
  const currentPos: any[] = getCurrentPosition();
 

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
    setPosition(pos.code);
    const newPos = instructionSelector(pos.code, instructions, setInstruction);
    console.log('pos.code', pos.code);
    setFinalInstruction(newPos.code);
  };
  

  const oneUp = () => {
    setFade(true);
    let newCount = count +1;
    if (newCount === positionCodes.length) newCount = 0;
    setCount(newCount);
    positionChange(newCount);
  };

  const oneDown = () => {
    setFade(true);
    let newCount = count -1;
    if (newCount === -1) newCount = positionCodes.length -1;
    setCount(newCount);
    positionChange(newCount);
   
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
