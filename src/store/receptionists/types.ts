import { ActionType, StateType } from 'typesafe-actions';

export type ReceptionistsAction = ActionType<typeof import('./actions')>;

export type ReceptionistsState = StateType<typeof import('./reducer').default>;
