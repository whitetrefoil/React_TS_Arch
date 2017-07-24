import React from 'react'
import { RouteComponentProps } from 'react-router'

export class About extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div className="about-page">
        <h1>React Arch (react-arch)</h1>
        <p>A basic project structure built with React &amp; TS.</p>
      </div>
    )
  }
}
