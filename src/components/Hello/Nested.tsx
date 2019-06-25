import * as React from 'react';
import * as css   from './Nested.scss';


interface Props {
  name?: string;
}

interface Locals {
  testData: string;
}

export class Nested extends React.Component<Props, Locals> {
  constructor(props: Props) {
    super(props);
    this.state = {
      testData: 'This is a test string',
    };
  }

  render(): React.ReactNode {
    return <div className={`nested ${css.nested}`}>
      <h1 className="h1">[component] Nested</h1>

      <p>This is a component in "{this.props.name}" module.</p>

      <p>{this.state.testData}</p>
    </div>;
  }
}

export default Nested;
