import React           from 'react';
import { PageLoading } from './components/shared/PageLoading';
import { getLogger }   from './services/log';


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`);


async function bootstrap() {
  import('./styles/global.scss');
  const ReactDOM     = await import(/*webpackChunkName:"react-dom"*/'react-dom');
  const { Provider } = await import(/*webpackChunkName:"react-redux"*/'react-redux');
  const store        = await import(/*webpackChunkName:"|store"*/'./store').then(m => m.default);
  const App          = React.lazy(() => import(/*webpackChunkName:"|components|App"*/'./components/App'));

  ReactDOM.render(
    <Provider store={store}>
      <React.Suspense fallback={<PageLoading/>}>
        <App/>
      </React.Suspense>
    </Provider>,
    document.getElementById('app'),
  );
}

bootstrap()
  .then(() => {
    debug('Bootstrapped!');

    const loadingErrorDiv = document.getElementById('loading-error');
    if (loadingErrorDiv != null) {
      loadingErrorDiv.remove();
    }
  });
