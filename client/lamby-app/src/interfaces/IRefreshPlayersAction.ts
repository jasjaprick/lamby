import {IAction} from './IAction';
import  {IPlayer} from './IPlayer'


export interface IRefreshPlayersAction extends IAction<'REFRESH_PLAYERS'> {
  payload: {
    players: IPlayer[];
  };
}