import * as React from 'react'
import './app.scss'

export interface AppProps {
  store: object
}

export default class App extends React.Component {
  render() {
    return <h1>Hello Electron!</h1>
  }
}
