import * as React                                from 'react';
import { useEffect, useRef }                     from 'react';
import { connect }                               from 'react-redux';
import { Route }                                 from 'react-router-dom';
import { getGreeting }                           from '../../store/receptionists/selector';
import { changeAReceptionist, initReceptionist } from '../../store/receptionists/thunks';
import { RootState }                             from '../../store/types';
import * as css                                  from './index.scss';


const Shared = React.lazy(() => import(/*webpackChunkName:"|c|s|Shared"*/'../shared/Shared'));
const Nested = React.lazy(() => import(/*webpackChunkName:"|c|Nested"*/'./Nested'));


interface MappedState {
  receptionist?: Receptionist;
  greeting: string;
}

interface MappedDispatches {
  init(): ReturnType<typeof initReceptionist>;
  change(): ReturnType<typeof changeAReceptionist>;
}

interface Props {}

type Needed = MappedState&MappedDispatches&Props;


const useRenderCounter = () => {
  const rendered = useRef(0);
  rendered.current += 1;
  return rendered.current;
};


const Hello: React.FC<Needed> = props => {

  useEffect(() => {
    props.init();
  }, []);

  const rendered = useRenderCounter();

  return (
    <div className={`hello ${css.hello}`}>
      <h1 className="h1">[component] HelloPage</h1>

      <h3 className="h3">Hello!!!</h3>

      <p>{props.greeting}</p>

      <p>This page has been rendered {rendered} times.</p>

      <p>
        <button
          type="button"
          className="btn btn-danger"
          onClick={props.change}
        >Another receptionist!
        </button>
      </p>

      <section>
        <Route render={p => <Shared name={p.location.pathname}/>}/>
      </section>

      <section>
        <Nested name="hello"/>
      </section>

      <section>
        <h3 className="h3">url-loader test</h3>
        <div className={`image ${css.image}`}/>
      </section>
    </div>
  );
};


export default connect<MappedState, MappedDispatches, Props, RootState>(
  (state, props) => ({
    receptionist: state.receptionists.receptionist,
    greeting    : getGreeting(state.receptionists),
  }),
  dispatch => ({
    init  : () => dispatch(initReceptionist),
    change: () => dispatch(changeAReceptionist),
  }),
)(Hello);
