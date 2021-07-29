import { useState } from 'react'
import produce from 'immer'
const height = 35
const width = 50

type cell = 1 | 0

function App() {
	const [grid, setGrid] = useState(() => {
		const rows: cell[][] = Array(height).fill(Array(width).fill(0))
		return rows
	})

	const [running, setRunning] = useState(false)

	return (
		<>
			<button
				onClick={() => {
					setRunning(!running)
				}}
			>
				{running ? 'STOP' : 'START'}
			</button>
			<div
				className='App'
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${width},20px)`
				}}
			>
				{grid.map((row, i) =>
					row.map((cell, j) => (
						<div
							style={{
								width: '18px',
								height: '18px',
								backgroundColor: grid[i][j]
									? '#56638a'
									: undefined,
								border: 'solid 0.1px black'
							}}
							onClick={() => {
								const gridCopy = produce(grid, gridCopy => {
									gridCopy[i][j] = gridCopy[i][j] ? 0 : 1
								})
								setGrid(gridCopy)
							}}
						/>
					))
				)}
			</div>
		</>
	)
}

export default App
