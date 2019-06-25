import { Action, AnyAction }          from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StateType }                  from 'typesafe-actions';
import { MessagesAction }             from './messages/types';
import { ReceptionistsAction }        from './receptionists/types';

export type RootAction =
  | MessagesAction
  | ReceptionistsAction
  ;

export type RootState = StateType<typeof import('./reducer').default>;

export type IThunkAction = ThunkAction<Promise<any>, RootState, void, any>;

export type IThunkDispatch = ThunkDispatch<RootState, void, RootAction>;


declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
    RootState: RootState;
  }
}

declare module 'redux' {

  interface Dispatch<A extends Action = AnyAction> extends ThunkDispatch<RootState, void, A> {}
}
