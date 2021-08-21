import { useCallback, useRef, useState } from 'react'
import produce from 'immer'
const height = 35
const width = 80

type cell = 1 | 0

const operations = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
	[-1, -1],
	[-1, 1],
	[1, -1],
	[1, 1]
]

const generateEmptyGrid = () => {
	const rows: cell[][] = Array(height).fill(Array(width).fill(0))
	return rows
}

function App() {
	const [grid, setGrid] = useState(generateEmptyGrid)

	const [running, setRunning] = useState(false)

	const runningRef = useRef(running)
	runningRef.current = running

	const playGame = useCallback(() => {
		if (!runningRef.current) return

		setGrid(grid => {
			return produce(grid, newGrid => {
				for (let i = 0; i < height; i++) {
					for (let j = 0; j < width; j++) {
						let neighbours = 0
						operations.forEach(([x, y]) => {
							const i2 = i + x
							const j2 = j + y
							if (i2 >= 0 && i2 < height && j2 >= 0 && j2 < width) {
								neighbours += grid[i2][j2]
							}
						})

						//apply rules
						if (neighbours < 2 || neighbours > 3) {
							newGrid[i][j] = 0
						} else if (grid[i][j] === 0 && neighbours === 3) {
							newGrid[i][j] = 1
						}
					}
				}
			})
		})

		setTimeout(playGame, 200)
	}, [])

	return (
		<>
			<a
				target='_blank'
				rel='noreferrer'
				href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
			>
				Game Of Life
			</a>
			<br />
			<button
				onClick={() => {
					setRunning(!running)
					if (!running) {
						runningRef.current = true
						playGame()
					}
				}}
			>
				{running ? 'STOP' : 'START'}
			</button>

			<button
				onClick={() => {
					setGrid(() => {
						const rows = []
						for (let i = 0; i < height; i++) {
							rows.push(Array.from(Array(width), () => (Math.random() < 0.3 ? 1 : 0)))
						}
						return rows
					})
				}}
			>
				Random
			</button>

			<button
				onClick={() => {
					setGrid(generateEmptyGrid)
				}}
			>
				Clear
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
							key={`${i}:${j}`}
							style={{
								width: '18px',
								height: '18px',
								backgroundColor: grid[i][j] ? '#56638a' : undefined,
								border: 'solid 0.1px black',
								margin: '0'
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
