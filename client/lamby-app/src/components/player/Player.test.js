import React from "react";
import ReactDOM from 'react-dom';
import { render, waitFor, screen} from '@testing-library/react';
import Player from './Player';
import { api } from '../../services/apiClient';


jest.mock('../../services/apiClient')

//TEST RENDER COMPONENT => OK
const mocksPlayer = {
  player: 5,
  instruction: {
    code: 'LDM', 
    move: 'ldm-ot',
    content: 'Cover center'
  },
  updateView: ('TESTINGSON', 'Cover center')
}

//TEST RENDER LAST NAME
const mocksPlayer2 =  {
lastName: 'TESTINGSON',
playerNumber: 5
} ;

describe('Player component renders and player Number receive the correct data ' , ()=> {
  it ("Component Player renders correctly", async () => { 
    api.getPlayerById.mockResolvedValue(mocksPlayer2)
    render(<Player 
    player={mocksPlayer.player}
    instruction={mocksPlayer.instruction}
    updateView={mocksPlayer.updateView}
      />)
      expect(screen.getByRole("button")).toBeInTheDocument();
      await waitFor(()=> {
        expect(screen.getByRole("button")).toHaveTextContent(5);
      });
     });
   })



 


