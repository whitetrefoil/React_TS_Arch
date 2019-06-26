import * as React from 'react';
import * as css   from './Shared.scss';

interface Props {
  name: string;
}

export const Shared: React.FC<Props> = props =>
  <div className={`shared ${css.shared}`}>
    <h1 className="h1">[Component] Shared</h1>

    <p>This is a shared component. Name in URL is "{props!.name}".</p>
  </div>
;

export default Shared;
