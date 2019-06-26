import * as React           from 'react';
import { useRef, useState } from 'react';
import { A }                from '../shared/A';
import * as css             from './Nested.scss';


interface Props {
  name?: string;
}

export const Nested: React.FC<Props> = props => {
  const [testData, setTestData] = useState('This is a test string');
  const input                   = useRef<HTMLInputElement>(null);

  return (
    <div className={`nested ${css.nested}`}>
      <h1 className="h1">[component] Nested</h1>

      <p className="form-text">This is a component in "{props.name}" module.</p>

      <form action="javascript:">
        <p>{testData}</p>

        <p><A onClick={ev => setTestData(input.current!.value)}>Click to change ↑ text to</A>:
          <input ref={input} defaultValue={testData}/>
        </p>
      </form>
    </div>
  );
};

export default Nested;
