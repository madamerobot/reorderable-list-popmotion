import React, { Component } from 'react'
import './App.css'
import posed, { PoseGroup } from 'react-pose'

const Item = posed.li({
  // draggable: 'y',
  // init: { scale: 1 },
  // drag: { scale: 1.2 },
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

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [ 
        'Wash panties' , 
        'Call Mama',
        'Tidy up drawers',
        'Call Oma'
      ]
    }
  }

  handleMouseDown(e) {
    const currentIndex = e.target.id
    const newIndex = 3
    this.reshuffleArray(currentIndex, newIndex)
  }

  handleMouseUp(e) {
    console.log('Up')
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
      <ul 
        className="sidepanel"
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseUp={(e) => this.handleMouseUp(e)}
      >
        <PoseGroup>
          {this.state.items.map((item, index) => (
            <Item 
              // onValueChange={{ y: y => console.log(y) }}
              className="box" id={index} data-key={item} key={item}>{item}
            </Item>
          ))}
        </PoseGroup>
      </ul>
    );
  }
}

export default List