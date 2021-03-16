import {IAction} from './IAction';
import {IPosition} from './IPosition'

export interface IRefreshPositionsAction extends IAction<'REFRESH_POSITIONS'> {
  payload: {
    positions: IPosition[];
  };
}