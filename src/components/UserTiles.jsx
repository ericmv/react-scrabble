import React, { useEffect } from 'react';
import Tile from './Tile.jsx';

import './styles.css';

import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const fn = (active = false, currentIndex = 0, x = 0, y = 0, tiles=[1,2,3,4,5,6,7], currentId="") => (index) => {


    return active && index === currentIndex
        ? {
            x: (40*index) + x,
            y: y,
            zIndex: 1,
            immediate: true,
          }
        : {
            x: index * 40,
            y: 0,
            zIndex: 0,
            immediate: false,
        }
}

const UserTiles = ({ setTilesBack, setTiles, tiles, handleDrop, isOccupied }) => {


    const [springs, api] = useSprings(tiles.length, fn(), [tiles]);

    const handleDrag = ({ args:[currentIndex, letter, value, id], active, movement: [mx, my], xy: [x, y]}) => {
        api.start(fn( active, currentIndex, mx, my, tiles, id));

        if (!active) {
            const col = Math.floor(x / 40);
            const row = Math.floor(y / 40);

            if (isOccupied(row, col)) {
                return;
            }

            handleDrop(row, col, letter, value, id)
        }
    }

    useEffect(() => {
        api.start(fn())
    }, [tiles])

    const bind = useDrag(handleDrag);
    return (
        <>
            <div style={{position: 'relative', padding: '2em'}}>
                {
                    springs.map((springProps, i) => {
                        const { zIndex, y, x, reset } = springProps;
                        return (
                            <animated.div key={tiles[i].id} {...bind(i, tiles[i].letter, tiles[i].value, tiles[i].id)} style={{position:'absolute', x, y}}>
                                <Tile letter={tiles[i].letter} value={tiles[i].value}/>
                            </animated.div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default UserTiles
