import React from "react";

export function GridLines({grid, orientation}) {
  const color = '#00000060';
  const size = grid.tileSize || 20;
  const style = {
    [`backgroundPosition${orientation}`]: `${grid['offset' + orientation]}px`,
    backgroundSize: [`${size}px`, '100%'].sort(() => ({X: 1, Y: -1}[orientation])).join(' '),
    backgroundImage: `linear-gradient(to ${{
      X: 'right',
      Y: 'bottom'
    }[orientation]}, #0000, #0000 ${size - 1}px, ${color} ${size - 1}px)`
  };
  return (
    <div className="grid-display" style={style}/>
  );
}