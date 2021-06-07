import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Tile from './Tile.jsx';

const fn = (active = false, x = 0, y = 0, row, col) => (index) =>
    active ?
        {
            x: (40*col) + x,
            y: (40*row) + y,
            zIndex: 1000,
            immediate: true
        } :
        {
            x: col*40,
            y: row*40,
            zIndex: 300,
            immediate: true,
        }


const DraggableTileWrapper = (props) => {
    const {
        letter,
        value,
        row,
        col,
        handleRemove,
        handleMove,
        isOccupied
    } = props;

    const [styles, api] = useSpring(() => ({ x: col*40, y:row*40, immediate: true }), [row, col])

    const handleDrag = ({ active, movement: [mx, my], xy: [x, y], tap }) => {
        if (tap) {
            handleRemove(row, col);
            return;
        };
        api.start(fn( active, mx, my, row, col));
        if (!active) {
            const curCol = Math.floor(x / 40);
            const curRow = Math.floor(y / 40);

            if (isOccupied(curRow, curCol)) {
                api.start(fn( active, mx, my, row, col));
                return;
            }

            handleMove([row, col], [curRow, curCol]);
        }

    }

    const bind = useDrag(handleDrag, { filterTaps: true })

    return (
        <animated.div {...bind()} style={{...styles, zIndex: 500, position: 'absolute', backgroundColor: 'blue'}} >
            <Tile letter={letter} value={value} />
        </animated.div>
    )
}


export default DraggableTileWrapper
