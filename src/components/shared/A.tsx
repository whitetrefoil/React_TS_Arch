import * as React from 'react';

export const A: React.FunctionComponentFactory<{}> = (props, ...children) =>
  <a href="javascript:" {...props}>{...children}</a>;
