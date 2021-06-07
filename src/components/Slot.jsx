import React from 'react';
import styled from 'styled-components';

const StyledTile = styled.div`
    background-color: grey;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    z-index: -1;
    border: 1px solid black;
`

const Slot = ({ row, col}) => {
    return (
        <StyledTile />
    )
}

export default Slot
