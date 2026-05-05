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
  const [painting, setPainting] = useState(false)

  console.log(grid);

  function paint(r, c) {
    const newGrid = grid.map(row => row.slice())

    newGrid[r][c] = currentColor

    setGrid(newGrid)
  }

  function dragPaint(r, c) {
    if(!painting) return
    paint(r,c)
  }

  window.addEventListener('mouseup', () => setPainting(false));
  
  function exportArt(EXPORT_SCALE = 1) {
    const canvas = document.createElement('canvas')
    canvas.width = GRID_WIDTH * EXPORT_SCALE
    canvas.height = GRID_HEIGHT * EXPORT_SCALE
    const ctx = canvas.getContext('2d')
    for (let r = 0; r < GRID_WIDTH; r++) {
      for (let c = 0; c <GRID_HEIGHT; c++) {
        ctx.fillStyle = grid[r][c]
        ctx.fillRect(c * EXPORT_SCALE, r * EXPORT_SCALE, EXPORT_SCALE, EXPORT_SCALE)
      }
    }
    const link = document.createElement('a')
    link.download = 'pixel-art.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="pixel-art">
      <label className="pixel-tool"> <h2>Pixel Art Editor</h2>Color
        <input type="color" value={currentColor}
          onChange={e => setCurrentColor(e.target.value)} />
        <div className = "presets">
          {PRESET_COLORS.map(color => (
            <button key = {color} className={'preset' + (color === currentColor ? ' selected' : '')} style = {{ background: color }}
            onClick={() => setCurrentColor(color)}/>))}
        </div>
        <button className="clear-btn" onClick={() => setGrid(makeGrid())}>Clear</button>
        <button className="exportArt" onClick={exportArt}>Export Art</button>
      </label>
      <div className="pixel-grid"
        style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }} >
        {grid.map((row, r) => 
          row.map((color, c) => (
            <button key={`{r}-${c}`} className="pixel"
            style={{ background: color }}
            aria-label={`Pixel ${r}, ${c}`}
            onClick = {() => paint(r, c)}
            onMouseEnter = {() => dragPaint(r,c)}
            onMouseDown={() => setPainting(true)}
            />
          ))
        )}
      </div>
    </div>
  )
}



export default App
