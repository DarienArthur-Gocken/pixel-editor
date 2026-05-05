import { useState } from 'react'
import './App.css'

const DEFAULT_COLOR = '#ffffff'
const GRID_WIDTH = 16
const GRID_HEIGHT = 16

const PRESET_COLORS = ['#ffffff', '#1a1a1a', '#505050', '#ffc567', '#fb7da8', '#fd5a46', '#552cb7', '#00995a']

function makeGrid() {
  return Array.from({length: GRID_HEIGHT}, () => Array(GRID_WIDTH).fill(DEFAULT_COLOR))
}

function App() {
  const [grid, setGrid] = useState(makeGrid)
  const [currentColor, setCurrentColor] = useState('#1a1a1a')

  console.log(grid);

  function paint(r, c) {
    const newGrid = grid.map(row => row.slice())

    newGrid[r][c] = currentColor

    setGrid(newGrid)
  }

  

  return (
    <div className="pixel-art">
      <label className="pixel-tool"> Color
        <input type="color" value={currentColor}
          onChange={e => setCurrentColor(e.target.value)} />
        <div classname = "presets">
          {PRESET_COLORS.map(color => (
            <button key = {color} className={'preset' + (color === currentColor ? ' selected' : '')} style = {{ background: color }}
            onClick={() => setCurrentColor(color)}/>))}
        </div>
        <button className="clear-btn" onClick={() => setGrid(makeGrid())}>Clear</button>
      </label>
      <div className="pixel-grid"
        style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }} >
        {grid.map((row, r) => 
          row.map((color, c) => (
            <button key={`{r}-${c}`} className="pixel"
            style={{ background: color }}
            aria-label={`Pixel ${r}, ${c}`}
            onClick = {() => paint(r, c)}
            />
          ))
        )}
      </div>
    </div>
  )
}



export default App
