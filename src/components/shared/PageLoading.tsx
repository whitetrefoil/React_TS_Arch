import * as React from 'react';
import * as css   from './PageLoading.scss';

export const PageLoading: React.FunctionComponent<{}> = () =>
  <div className={`loading ${css.loading} text-primary`}>
    <div className="spinner-grow" role="status"/>
    <div className={`spinner-text ${css.text}`}>Loading&hellip;&hellip;</div>
  </div>;
