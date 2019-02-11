import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'

//Defining Pose Item with Spring Animation config
const Item = posed.li({
  draggable: 'y',
  init: { 
    scale: 1,
    backgroundColor: '#e5eeff',
    zIndex: 1
  },
  drag: { 
    scale: 1.2,
    boxShadow: '6px 7px 38px 0px rgba(237,237,237,0.47)',
    backgroundColor: '#d6e4ff',
    zIndex: 10
  },
  //Flip transition refers to PoseGroup
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
        'Buy make-up remover',
        'Call Oma',
        'Prep Rebecca birthday gift'
      ]
    }
  }

  //Detecting targetted row based on mouseY position
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

  //Swapping item index based on new row
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

  //Creating map of rows with top/bottom y-values to later match mouseY
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
      draggedItem: parseInt(e.target.dataset.tag)
    })
  }

  onDragEnd(e) {
    let newRow = this.trackRow(e)
    if (newRow !== this.state.draggedItem) {
      this.reshuffleArray(this.state.draggedItem, newRow)
    }
    this.setState({
      draggedItem: null
    })
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
                data-tag={index}
                data-key={item} 
                key={item}
                onDragEnd={(e) => this.onDragEnd(e)}
                onDragStart={(e) => this.onDragStart(e)}
                >
                <div className="prio-label">{index + 1}</div>
                <div className="tag" data-tag={index}>{item}</div>
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