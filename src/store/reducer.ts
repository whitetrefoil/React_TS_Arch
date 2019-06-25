import { combineReducers }  from 'redux';
import messagesReducer      from './messages/reducer';
import receptionistsReducer from './receptionists/reducer';


export const rootReducer = combineReducers({
  messages     : messagesReducer,
  receptionists: receptionistsReducer,
});

export default rootReducer;
