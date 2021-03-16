import {IMatch} from './IMatch';
import {IPosition} from './IPosition';
import {IPlayer} from './IPlayer';

export interface IAppStateValue {
  data: {
    match: IMatch;
    positions: IPosition[];
    players: IPlayer[];
    playerName: string;
    instruction: string;
  };
}