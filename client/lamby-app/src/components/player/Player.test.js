import React from "react";
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Player from './Player';


//TEST RENDER COMPONENT => OK
const mocksPlayer = {
  player: 92,
  instruction: {
    code: 'LDM', 
    move: 'ldm-ot',
    content: 'Cover center'
  },
  updateView: ('TESTINGSON', 'Cover center')
}



//TEST RENDER LAST NAME
const mocksLastName =  'TESTINGSON';

describe('Player component' , ()=> {
  it ("renders correctly", () => { 
    render(<Player 
    player={mocksPlayer.player}
    instruction={mocksPlayer.instruction}
    updateView={mocksPlayer.updateView}
      />)
  expect(screen.getByRole("button")).toBeTruthy;
   });


   it('render last Name', ()=> {
    render(<Player 
      lastName={mocksLastName}
      instruction={mocksPlayer.instruction}
        />)
        expect(screen.getByRole('button')).toBeInTheDocument();
   })
});

