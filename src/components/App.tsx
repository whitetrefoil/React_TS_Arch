import React                    from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';


const Hello = React.lazy(() => import(/*webpackChunkName:"|components|Hello"*/'./Hello'));


interface AppState {
}

export class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div id="app" className="app-loaded container">
        <h1 className="h1">[Component] MyApp</h1>

        <BrowserRouter>
          <Route path="/" component={Hello}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
