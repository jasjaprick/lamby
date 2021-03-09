import React, { useContext, useState } from 'react';
import './matchEditor.scss';
import { Link } from 'react-router-dom';
import { ICode, IPosition, IPlayer } from '../../interfaces/interfaces';
import { AppStateContext } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { useStateDispatch } from '../../context/AppState';


const MatchEditor: React.FC = () => {
  const { data } = useContext(AppStateContext);
  const [position, setPosition] = useState('GK');
  const [player, setPlayer] = useState(1);
  const [count, setCount] = useState(0);
  const [finalInstruction, setFinalInstruction] = useState('gk-sb');
  const [instructions, setInstruction] = useState([
    { code: 'gk-sb', content: 'Goal keeper stay back' },
    { code: 'gk-jp', content: 'Goal keeper join play' },
  ]);
  const dispatch = useStateDispatch();
  let counter = 0;


  // DATA VARS
  const players: IPlayer[] = data.players;
  const matchId: number = data.match.id;
  const matchPlayers = data.positions;



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
    { code: 'RW', content: 'Right Winger' }
  ];

  const instructionSelector = (position: string): ICode => {
    let instructions;
    switch (position) {
      case 'GK':
        instructions = [
          { code: 'gk-sb', content: 'Stay back' },
          { code: 'gk-jp', content: 'Join play' },
        ];
        break;
      case 'LCB':
      case 'RCB':
        instructions = [
          { code: 'cb-ot', content: 'Offside trap' },
          { code: 'cb-sb', content: 'Stay back' },
          { code: 'cb-ja', content: 'Join attack' },
        ];
        break;
      case 'LB':
      case 'RB':
        instructions = [
          { code: 'lrb-ot', content: 'Offside trap' },
          { code: 'lrb-sb', content: 'Stay Back' },
          { code: 'lrb-ja', content: 'Join attack' },
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

  const positionOptions: JSX.Element[] = [];

  for (const positionCode of positionCodes) {
    positionOptions.push(
      <option key={positionCode.code} value={positionCode.code}>
        {positionCode.content}
      </option>
    );
  }
  // END OF OPTIONS INSTANTIATION

  // CHANGE/SUBMIT HANDLERS
  const handlePositionChange = (e) => {
    const newPos = instructionSelector(e.target.value);
    setPosition(e.target.value);
    setFinalInstruction(newPos.code);
    console.log(finalInstruction);
  };

  const positionChange = (num) => {
    const pos = positionCodes[num];
    const newPos = instructionSelector(pos.code);
    setPosition(pos.code);
    setFinalInstruction(newPos.code);
  }

  const oneUp = () => {
        if (count === 11) setCount(0);
        else setCount(count + 1);
        console.log(count);
        positionChange(count);
  }

  const oneDown = () => {
    if (count === 0) setCount(11)
    else setCount(count-1) 
    console.log(count)
    positionChange(count)
  }

  const handlePlayerChange = (e) => {
    setPlayer(e.target.value);
  };

  const handleInstructionChange = (e) => {
    setFinalInstruction(e.target.value);
    console.log(finalInstruction);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchPosition: IPosition = {
      matchId: matchId,
      userId: player,
      position: position,
      instruction: finalInstruction,
    };
        api.postMatchPosition(matchPosition)
        dispatch({
          type: 'UPDATE_POSITION',
          payload: {
            position: matchPosition
          },
        });
        console.log(matchPlayers)
      } 
    
    
  // END OF CHANGE/SUBMIT HANDLERS

  return (
    <div>
      <div>
        <div>
          <Link to='/match'>Back</Link>
          <h1>Edit Match</h1>
        </div>
        <div>
          <button onClick={oneDown}> prev</button>
          <div>
            <p>Goalkeeper</p>
            <p>Name</p>
          </div>
          <button onClick={oneUp}> next</button>
        </div>
        <form id='match-form' onSubmit={handleSubmit}>
          <label htmlFor='position'>Position: </label>
          <select
            name='position'
            id='position'
            onChange={handlePositionChange}
            value={position}
          >
            {positionOptions}
          </select>
          <br />
          <label htmlFor='player'>Player: </label>
          <select
            name='player'
            id='players'
            onChange={handlePlayerChange}
            value={player}
          >
            {playerOptions}
          </select>
          <br />
          <label htmlFor='instruction'>Instruction: </label>
          <select
            name='instruction'
            id='instruction'
            onChange={handleInstructionChange}
            value={finalInstruction}
          >
            {instructionOptions}
          </select>
          <br />
          <button type='submit'>SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default MatchEditor;
