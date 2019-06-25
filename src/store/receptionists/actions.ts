import { createAsyncAction, createStandardAction } from 'typesafe-actions';

export const setReceptionist = createStandardAction('receptionists/SET')<Receptionist>();

export const fetchReceptionistAsync = createAsyncAction(
  'receptionists/FETCH_REQUEST',
  'receptionists/FETCH_SUCCESS',
  'receptionists/FETCH_FAILURE',
)<void, Receptionist, Error>();
