import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'

//Defining Pose Item with Spring Animation config
const Item = posed.li({
  draggable: 'y',
  init: { 
    scale: 1,
    backgroundColor: '#EBB4CB',
    zIndex: 1
  },
  drag: { 
    scale: 1.12,
    boxShadow: '6px 7px 38px 0px rgba(237,237,237,0.47)',
    backgroundColor: '#DFACC1',
    zIndex: 10,
    // transition: {
    //   scale: { 
    //     type: 'spring', 
    //     stiffness: 150,
    //     damping: 50
    //   }
    // },
  },
  //Flip transition refers to PoseGroup
  flip: {
    transition: { 
      type: 'spring', 
      stiffness: 30, 
      damping: 8,
      restDelta: 0.5,
      restSpeed: 10 
    }
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      draggedItem: null,
      rowMap: [],
      taskInput: '',
      items: [ 'Call Mama', 'Call Oma', 'Wash socks', 'Plan trip']
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

   //Creating map of rows with top/bottom y-values to match mouseY
  updateRowMap() {
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

  updateItems(e) {
    if (e.key === 'Enter'){
      let newItems = this.state.items
      newItems.push(this.state.taskInput)
      this.setState({
        taskInput: '',
        items: newItems
      })
      this.forceUpdate()
      this.updateRowMap()
    }
  }

  deleteItem(e) {
    console.log(e.target.dataset.tag)
  }

  componentDidMount() {
    this.updateRowMap()
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

  updateInputValue(e) {
    this.setState({
      taskInput: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="center-container">
          <div className="header-container">
            <img className="blob" src="/assets/blob.svg" alt="blob"></img>
            <h1 className="header">DO IT</h1>
          </div>
          <div className="input-container">
            <img className="pen" src="/assets/pen-sml.svg" alt="pen"></img>
            <input 
              value={this.state.inputValue} 
              onChange={(e) => this.updateInputValue(e)}
              onKeyPress={(e) => this.updateItems(e)}>
            </input>
          </div>
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
                {/* <div className="prio-label" data-tag={index}>{index + 1}</div> */}
                <div className="tag" data-tag={index}>{item}</div>
                {/* <div className="close-x" data-tag={index} onClick={(e) => this.deleteItem(e)}>x</div> */}
              </Item>
            ))}
          </PoseGroup>
        </ul>
        <div className="bucket"></div>
        </div>
      </div>
    )
  }
}

export default App