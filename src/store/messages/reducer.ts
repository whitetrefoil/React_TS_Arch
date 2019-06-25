import { createReducer }                from 'typesafe-actions';
import { dismissMessage, queueMessage } from './actions';

const reducer = createReducer([] as string[])

  .handleAction(queueMessage, (s, a) => [...s, a.payload])

  .handleAction(dismissMessage, s => s.slice(1))
;

export default reducer;
