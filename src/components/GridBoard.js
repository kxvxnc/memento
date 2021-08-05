import React from 'react'
import GridSquare from './GridSquare'

export default function GridBoard(props) {

    const grid = [];
    let weeks = props.weeks;
    for (let row = 0; row < 80; row ++) {
        grid.push([])
        for (let col = 0; col < 52; col ++) {
            if (weeks > 0) {
                grid[row].push(<GridSquare key={`${col}${row}`} color="1" />)
            } else {
                grid[row].push(<GridSquare key={`${col}${row}`} color="0" />)
            }
            weeks--;
        }
    }

    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
}