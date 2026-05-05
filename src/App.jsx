import { useState } from 'react'
import './App.css'

const DEFAULT_COLOR = '#ffffff'
const GRID_WIDTH = 16
const GRID_HEIGHT = 16

function makeGrid() {
  return Array.from({length: GRID_HEIGHT}, () => Array(GRID_WIDTH).fill(DEFAULT_COLOR))
}

function makeGridElement() {
  
}

function App() {
  const [grid, setGrid] = useState(makeGrid)
  const [currentColor, setCurrentColor] = useState('#1a1a1a')

  console.log(grid);

  return (
    <div>
      grid.map(makeGridElement)
    </div>
  )
}

export default App
