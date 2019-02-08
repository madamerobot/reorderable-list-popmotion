import React, { Component } from 'react'
import './App.css'
import posed, { PoseGroup } from 'react-pose'

const Item = posed.li({
  draggable: 'y',
  init: { scale: 1 },
  drag: { scale: 1.2 },
  // dragEnd: {
  //   y: 0,
  //   transition: { type: 'spring', stiffness: 1000, damping: 15 }
  // },
  flip: {
    transition: { type: 'spring', stiffness: 30, damping: 6 }
  }
}
)

function shuffle(array, currentIndex, newIndex) {
  let temporaryValue = array[currentIndex]
  array[currentIndex] = array[newIndex]
  array[newIndex] = temporaryValue
  return array
}

function mapRows() {
  const allItems = [].slice.call(document.querySelectorAll('.box'))
  let rowMap = []
  allItems.forEach((item, index) => {
    let rowTopY = item.getBoundingClientRect().y
    let itemHeight = item.getBoundingClientRect().height
    let rowBottomY = rowTopY + itemHeight
    rowMap[index] = [rowTopY, rowBottomY]
  })
  return rowMap
}

function checkRange(value, min, max) {
  return ((value - min) * (value - max) <= 0)
}

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseY: 0,
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
    const rowMap = mapRows()
    this.setState({
      rowMap: rowMap
    })
  }

  onDragStart(e) {
    this.setState({
      isPressed: true,
      draggedItem: e.target.id
    })
  }

  trackRow(e) {
    let newRow = 0
    this.state.rowMap.forEach((row, index) => {
      if (checkRange(e.clientY, row[0], row[1])) {
        newRow = index
      }
    })
    this.setState({
      newRow: newRow
    })
  }

  onDragEnd(e) {
    this.trackRow(e)
    if (this.state.newRow !== this.state.draggedItem) {
      this.reshuffleArray(this.state.draggedItem, this.state.newRow)
    }
  }


  reshuffleArray = ((currentIndex, newIndex) => {
    this.setState(
      {
        items: shuffle(this.state.items, currentIndex, newIndex)
      }
    )
  })

  render() {
    return (
      <ul className="sidepanel"
      >
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
                {item}
            </Item>
          ))}
        </PoseGroup>
      </ul>
    );
  }
}

export default List