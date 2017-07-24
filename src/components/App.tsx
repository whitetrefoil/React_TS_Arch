import Layout from 'antd/lib/layout'
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { About } from './About'
import * as c from './App.less'
import { AppHeader } from './AppHeader'
import { Generator } from './Generator'

const { Header, Content, Footer } = Layout;

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
