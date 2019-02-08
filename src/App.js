import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'

//Defining Pose Item with Spring Animation config
const Item = posed.li({
  draggable: 'y',
  init: { 
    scale: 1,
    backgroundColor: '#e5eeff'
  },
  drag: { 
    scale: 1.2,
    boxShadow: '6px 7px 38px 0px rgba(237,237,237,0.47)',
    backgroundColor: '#d6e4ff'
  },
  //Transition refers to PoseGroup
  flip: {
    transition: { type: 'spring', stiffness: 30, damping: 6 }
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false,
      draggedItem: null,
      newRow: null,
      rowMap: [],
      items: [
        'Call Mama',
        'Tidy up drawers',
        'But make-up remover',
        'Call Oma',
        'Prep Rebecca birthday gift'
      ]
    }
  }

  componentDidMount() {
    const allItems = [].slice.call(document.querySelectorAll('.box'))
    let rowMap = []
    allItems.forEach((item, index) => {
      const rowTopY = item.getBoundingClientRect().y
      const itemHeight = item.getBoundingClientRect().height
      const rowBottomY = rowTopY + itemHeight
      rowMap[index] = [rowTopY, rowBottomY]
    })
    this.setState({
      rowMap: rowMap
    })
  }

  onDragStart(e) {
    this.setState({
      draggedItem: e.target.id
    })
  }

  trackRow(e) {
    let newRow = 0
    this.state.rowMap.forEach((row, index) => {
      let value = e.clientY
      let min = row[0]
      let max = row[1]
      let isInRange = (value - min) * (value - max) <= 0
      if (isInRange) {
        newRow = index
      }
    })
    return newRow
  }

  onDragEnd(e) {
    let newRow = this.trackRow(e)
    let draggedItem = this.state.draggedItem
    if (newRow !== this.state.draggedItem) {
      this.reshuffleArray(draggedItem, newRow)
    }
  }

  reshuffleArray (currentIndex, newIndex) {
    const array = this.state.items
    let newArray = []
    if (newIndex !== currentIndex) {
      let temporaryValue = array[currentIndex]
      array[currentIndex] = array[newIndex]
      array[newIndex] = temporaryValue
      newArray = array
    }
    this.setState(
      {
        items: newArray
      }
    )
  }

  render() {
    return (
      <div className="App">
        <div className="center-container">
          <ul className="list-wrapper">
          <PoseGroup>
            {this.state.items.map((item, index) => (
              <Item
                className="box" 
                id={index} 
                data-key={item} 
                key={item}
                onDragEnd={(e) => this.onDragEnd(e)}
                onDragStart={(e) => this.onDragStart(e)}
                >
                <div className="prio-label">{index + 1}</div>
                <div className="tag">{item}</div>
              </Item>
            ))}
          </PoseGroup>
        </ul>
        </div>
      </div>
    )
  }
}

export default App