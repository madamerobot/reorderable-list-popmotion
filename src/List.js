import React, { Component } from 'react'
import './App.css'
import posed, { PoseGroup } from 'react-pose'

//Defining Pose Item with Spring Animation config
const Item = posed.li({
  draggable: 'y',
  init: { scale: 1 },
  drag: { scale: 1.2 },
  flip: {
    transition: { type: 'spring', stiffness: 30, damping: 6 }
  }
})

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false,
      draggedItem: null,
      newRow: null,
      rowMap: [],
      items: [
        'Wash panties',
        'Call Mama',
        'Tidy up drawers',
        'Call Oma'
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
    if (newRow !== this.state.draggedItem) {
      this.reshuffleArray(this.state.draggedItem, newRow)
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
              <span className="prio-label">{index + 1}</span>{item}
            </Item>
          ))}
        </PoseGroup>
      </ul>
    );
  }
}

export default List