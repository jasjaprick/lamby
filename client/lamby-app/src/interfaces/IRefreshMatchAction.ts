import {IAction}from './IAction';
import {IMatch} from './IMatch';

export interface IRefreshMatchAction extends IAction<'REFRESH_MATCH'> {
  payload: {
    match: IMatch;
  };
}
