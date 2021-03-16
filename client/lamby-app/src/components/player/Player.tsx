import React, { useState, useEffect } from 'react';
import './Player.scss';
import { api } from '../../services/apiClient';
import { IPlayerPosition } from '../../interfaces/IPlayerPosition';


interface IPlayerProp {
  player: number;
  instruction: IPlayerPosition;
  updateView: (Pname: string, PInstruc: string) => void;
}

const Player: React.FC<IPlayerProp> = ({player, instruction, updateView}: any) => {
  const [lastName, setLastName] = useState('');
  const [playerNumber, setPlayerNumber] = useState(0);
  useEffect(() => {
    async function getPlayerName(): Promise<void> {
      const result = await api.getPlayerById(player);
      setLastName(result.lastName);
      setPlayerNumber(result.playerNumber);
    }

    getPlayerName();
  }, []);

  function sayHello() {
    const currentElement = document.querySelector(`.${instruction.code}`);
    currentElement.classList.add(instruction.move);

    setTimeout(() => {
      currentElement.classList.remove(instruction.move);
    }, 3000);
  }

  const classes = `player-dot ${instruction.code}`;

  return (
    <button
      key={player}
      onClick={() => {
        updateView(lastName, instruction.content);
        sayHello();
      }}
      className={classes}
      >
      <p data-testid='player-number-text'>{playerNumber}</p>
          </button>
  );
};

export default Player;
