import React, { Component } from 'react'
import './App.css'
import List from './List.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
     //
    }
  }

  render() {
    return (
      <div className="App" >
        <div className="center-container">
          <List />
        </div>
      </div>
    )
  }
}

export default App
