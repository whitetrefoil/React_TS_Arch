import Layout from 'antd/lib/layout'
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import asyncComponent from '../helpers/async-component'
import * as c from './App.less'
import { AppHeader } from './AppHeader'
import { Generator } from './Generator'

const { Header, Content, Footer } = Layout
const About = asyncComponent(() => import(/* webpackChunkName: "about" */'./About'))

interface AppState {
  selectedKeys: string[]
}

export class App extends React.Component {
  state: AppState

  constructor(props: any) {
    super(props)
    this.state = {
      selectedKeys: [],
    }
  }

  render() {
    return (
      <Router>
        <Layout>
          <Route component={AppHeader}/>

          <Content className={c.appContent}>
            <div className={c.appContentPanel}>
              <Route exact path="/" component={Generator}/>
              <Route exact path="/about" component={About}/>
            </div>
          </Content>

          <Footer className={c.appFooter}>
            Powered by World
          </Footer>
        </Layout>
      </Router>
    )
  }
}

export default App
