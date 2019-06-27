import React                    from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';


const Hello = React.lazy(() => import(/*webpackChunkName:"|c|Hello"*/'./Hello'));


interface AppState {
}

export const App: React.FC = () =>
  <div className="container">
    <h1 className="h1">[Component] MyApp</h1>

    <BrowserRouter>
      <Route path="/" component={Hello}/>
    </BrowserRouter>
  </div>
;

export default App;
