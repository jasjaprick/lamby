import {IAction} from './IAction';

export interface IRefreshInstruction extends IAction<'REFRESH_INSTRUCTION'> {
  payload: {
    instruction: string;
  };
}