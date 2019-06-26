import { createReducer }                           from 'typesafe-actions';
import { fetchReceptionistAsync, setReceptionist } from './actions';


interface State {
  receptionist?: Receptionist;
  initialized: boolean;
  loading: boolean;
  failure?: Error;
}

const state: State = {
  initialized: false,
  loading    : false,
};

export const reducer = createReducer(state)

  .handleAction(setReceptionist, (s, a) => ({
    ...s,
    initialized : true,
    receptionist: a.payload,
  }))

  .handleAction(fetchReceptionistAsync.request, (s, a) => ({
    ...s,
    loading: true,
    failure: undefined,
  }))

  .handleAction(fetchReceptionistAsync.success, (s, a) => ({
    ...s,
    initialized : true,
    loading     : false,
    failure     : undefined,
    receptionist: a.payload,
  }))

  .handleAction(fetchReceptionistAsync.failure, (s, a) => ({
    ...s,
    loading: false,
    failure: a.payload,
  }))
;

export default reducer;
