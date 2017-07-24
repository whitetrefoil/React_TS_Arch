import Menu from 'antd/es/menu'
import Layout from 'antd/lib/layout'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import * as c from './AppHeader.less'

const { Header } = Layout

export class AppHeader extends React.Component<RouteComponentProps<any>> {

  componentWillMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Header>
        <div className={c.appTitle}>React Arch</div>
        <Menu
          className={c.appMenu}
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={[this.props.location.pathname]}
        >
          <Menu.Item key="/"><Link to="/">Generator</Link></Menu.Item>
          <Menu.Item key="/about"><Link to="/about">About</Link></Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default AppHeader
