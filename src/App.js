import React, { Component } from 'react'
import './App.css'
import posed from 'react-pose'

const Box = posed.div({
  draggable: 'y',
  init: { scale: 1 },
  drag: { scale: 1.2 },
  dragEnd: {
    y: 0,
    transition: { type: 'spring', stiffness: 1000, damping: 15 }
  }
})

class App extends Component {

  constructor(props){
    super(props)
    // this.state = {
    //   isVisible: 'hidden'
    // }
  }

  handleMouseDown(e) {
    console.log('Down')
    // this.setState({
    //   isVisible: 'visible'
    // })
  }

  handleMouseUp(e) {
    console.log('Up')
    // this.setState({
    //   isVisible: 'hidden'
    // })
  }

  render() {
    return (
      <div className="App" >
        <div className="center-container">
          < Box className="box"/>
          < Box className="box"/>
          < Box className="box"/>
        </div>
      </div>
    )
  }
}

export default App
