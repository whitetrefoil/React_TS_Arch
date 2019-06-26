import * as React from 'react';

export const A: React.FC<React.ComponentProps<'a'>> = props =>
  <a href="javascript:" {...props}>{props.children}</a>;
