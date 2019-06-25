import { ActionType, StateType } from 'typesafe-actions';

export type MessagesAction = ActionType<typeof import('./actions')>;

export type MessagesState = StateType<typeof import('./reducer').default>;
