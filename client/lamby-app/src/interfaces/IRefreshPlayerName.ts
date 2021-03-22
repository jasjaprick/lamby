import {IAction} from './IAction';

export interface IRefreshPlayerName extends IAction<'REFRESH_NAME'> {
  payload: {
    playerName: string;
  };
}