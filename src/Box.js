import React, { Component } from 'react'
import './App.css'
import posed from 'react-pose'

const Box = posed.div({ draggable: 'x' })

export default ({ onStart, onEnd, onDrag }) => (
  <Box
    onDragStart={onStart}
    onDragEnd={onEnd}
    onValueChange={{ x: onDrag }}
  />
)