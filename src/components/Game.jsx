import React, { useState } from 'react';
import Board from './Board.jsx';
import UserTiles from './UserTiles.jsx';
import { v4 as uuidv4 } from 'uuid';


const rows = 15;
const cols = 15;

// const tileSize = 40;

let tiles = [
    { id: uuidv4(), letter: "A", value: 1},
    { id: uuidv4(), letter: "X", value: 10},
    { id: uuidv4(), letter: "G", value: 4},
    { id: uuidv4(), letter: "D", value: 3},
    { id: uuidv4(), letter: "E", value: 1},
    { id: uuidv4(), letter: "A", value: 1},
    { id: uuidv4(), letter: "C", value: 15},
]


let tiles2 = [
    { id: uuidv4(), letter: "A", value: 1},
    { id: uuidv4(), letter: "X", value: 10},
    { id: uuidv4(), letter: "D", value: 3},
    { id: uuidv4(), letter: "E", value: 1},
    { id: uuidv4(), letter: "A", value: 1},
    { id: uuidv4(), letter: "C", value: 15},
]


const Game = () => {
    const [board, setBoard] = useState(new Array(cols).fill(new Array(rows).fill(null)));
    const [userTiles, setUserTiles] = useState(tiles);
    // const [score, setScore] = useState([0, 0]);

    const placeTile = (r, c, letter, value, id) => {
        const newBoard = board.map((row, i) => row.map((item, j) => i === r && j === c ? {letter, value, id, removable: true} : item));
        const newUserTiles = userTiles.filter(tile => tile.id !== id).map((item) => {
            return {...item, id: uuidv4()}
        })
        setBoard(newBoard);
        setUserTiles(newUserTiles);
    }

    // const setTile = (r, c, letter, value, id) => {
    //     const newBoard = board.map((row, i) => row.map((item, j) => i ===r && j === c ? {letter, value, id, removable: true} : item));
    //     const newUserTiles = userTiles.filter((tile) => tile.id !== id);
    //     setBoard(newBoard);
    //     setUserTiles(newUserTiles);
    // }

    const removeTile = (r, c) => {

        const newUserTiles = [...userTiles, {...board[r][c], id: uuidv4()}];
        const newBoard = board.map((row, i) => row.map((item, j) => i === r && j === c ? null : item));
        setBoard(newBoard);
        setUserTiles(newUserTiles);
    }

    const moveTile = (from, to) => {
        const [fromRow, fromCol] = from;
        const [toRow, toCol] = to;

        const tile = board[fromRow][fromCol];
        // maybe filter by id instead?
        const newBoard = board.map((row, i) => {
            return row.map((item, j) => {
                if (i === fromRow && j === fromCol) {
                    return null;
                }
                else if (i === toRow && j === toCol)
                    return tile;
                else
                    return item;
            })
        })
        setBoard(newBoard);
    }

    const isOccupied = (row, col) => {
        if (row < 0 || row > 14 || col < 0 || col > 14) {
            return true;
        }
        return getTile(row, col) !== null;
    }

    const getTile = (row, col) => {
        return board[row][col];
    }

    const setTiles = () => {
        console.log('changing user tile to', tiles2)
        setUserTiles(tiles2)
    }

    const setTilesBack = () => {
        console.log('setting user tiles back to', tiles)
        setUserTiles(tiles)
    }

    return (
        <div>
            <Board board={board} handleMove={moveTile} handleRemove={removeTile} isOccupied={isOccupied}/>
            <UserTiles tiles={userTiles} handleDrop={placeTile} isOccupied={isOccupied} />
        </div>
    )
}

export default Game;
