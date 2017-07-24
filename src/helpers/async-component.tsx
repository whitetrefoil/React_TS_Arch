import React from 'react'

export interface IAsyncComponentLoaded {
  default: any // as React.Component
}

export type IAsyncComponentLoader = () => Promise<IAsyncComponentLoaded>

export interface IAsyncComponentState {
  Component: any
}

export default function asyncComponent(loader: IAsyncComponentLoader, collection?: any) {
  return class AsyncComponent extends React.Component<any, IAsyncComponentState> {
    Component: typeof React.Component

    constructor(props: any) {
      super(props)
      this.Component = null
      this.state = { Component: this.Component }
    }

    componentWillMount() {
      if (this.state.Component == null) {
        loader()
          .then((component) => {
            const Component = component.default as typeof React.Component
            this.Component = Component
            this.setState({ Component })
          })
      }
    }

    render() {
      if (this.state.Component != null) {
        return (
          <this.state.Component {...this.props} {...collection}/>
        )
      }
      return null
    }
  }
}
