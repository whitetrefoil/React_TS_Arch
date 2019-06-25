import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools }          from 'redux-devtools-extension';
import thunk                            from 'redux-thunk';
import { rootReducer }                  from './reducer';


const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});


export default createStore(rootReducer/* preloadedState, */, composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
));
