import React from 'react';
import Slot from './Slot.jsx';
import DraggableTileWrapper from './DraggableTileWrapper.jsx';

// import { useSprings, animated } from 'react-spring';
// import { useGesture, useDrag } from 'react-use-gesture';
//
// const fn = (active = false, currentIndex = 0, x = 0, y = 0) => (index) => {
//     return active && index === currentIndex
//         ? {
//             x: (40*index) + x,
//             y: y,
//             zIndex: 1,
//             immediate: true
//           }
//         : {
//             x: index * 40,
//             y: 0,
//             zIndex: 0,
//             immediate: false,
//         }
// }


const Board = (props) => {
    const { board, ...rest } = props;

    return (
        <div className="content" style={{ height: 40 * 15, width: 40 * 15 }}>
            {
                board.map((row, i) => {
                    return row.map((tile, j) => {
                        if (tile) {
                            return (
                                <DraggableTileWrapper
                                    id={tile.id}
                                    letter={tile.letter}
                                    value={tile.value}
                                    removable={tile.removable}
                                    row={i}
                                    col={j}
                                    key={tile.id}
                                    {...rest}
                                />
                            )
                        } else {
                            return(
                                <div style={{zIndex: 0, left: j*40, top: i*40}}>
                                    <Slot />
                                </div>
                            )
                        }

                    })
                })
            }
        </div>
    )
}

export default Board;
