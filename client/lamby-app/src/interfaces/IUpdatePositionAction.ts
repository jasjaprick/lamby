import {IAction }from './IAction';
import {IPosition }from './IPosition';

export interface IUpdatePositionAction extends IAction<'UPDATE_POSITION'> {
  payload: {
    position: IPosition;
  };
}