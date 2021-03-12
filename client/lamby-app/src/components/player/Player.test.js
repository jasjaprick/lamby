import React from "react";
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Player from './Player';
// import { IPlayerProp } from '../../interfaces/interfaces';

// console.log('IPlayerProp -> ' , IPlayerProp);
// console.log('Player -> ' , Player);

const mocksPlayer = {
  player: 5,
  instruction: {
    code: 'gk gk-sb', 
    move: 'any move',
    content: 'Stay back'
  },
  updateView: ('Pname', 'Stay back during the game')
}

describe('Player component' , ()=> {
  
  it ("renders correctly", () => { 
    render(<Player 
    player={mocksPlayer.player}
    instruction={mocksPlayer.instruction}
    updateView={mocksPlayer.updateView}
      />)
  expect(screen.getByRole("button")).toBeTruthy;
  
  
  })
}
)