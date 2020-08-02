import React, {useContext, useEffect} from "react";
import BattleContext from "../contexts/BattleContext";
import Token from "./Token";
import {useDrop} from "react-dnd";
import {GridLines} from "./GridLines";

export default function Grid({grid}) {
  const battle = useContext(BattleContext);
  const normalizeCoords = ({x, y}) => ({x: x - grid.bounds.left, y: y - grid.bounds.top});
  const coordsToCell = ({x, y}) => ({x: Math.floor(x / grid.tileSize), y: Math.floor(y / grid.tileSize)});
  const cellToCoords = ({x, y}) => ({x: x * grid.tileSize, y: y * grid.tileSize});

  const [, drop] = useDrop({
    accept: 'token',
    drop: (item, monitor) => {
      const {x, y} = coordsToCell(normalizeCoords(monitor.getClientOffset()));
      const {x: left, y: top} = cellToCoords({x, y});
      const token = {...item, width: grid.tileSize, height: grid.tileSize, x, y, left, top};
      if (item.id)
        battle.updateToken(token);
      else
        battle.addToken(token);
    }
  });

  useEffect(() => {
    battle.tokensOnGrid.forEach(token => {
      if (token.width !== grid.tileSize) {
        const {x: left, y: top} = cellToCoords(token);
        battle.updateToken({...token, width: grid.tileSize, height: grid.tileSize, left, top});
      }
    });
  });

  return grid.bounds.width > 0 && (
    <div className="grid-container" style={grid.bounds}>
      {grid.show && [
        <GridLines key="x" grid={grid} orientation="X"/>,
        <GridLines key="y" grid={grid} orientation="Y"/>
      ]}
      <div ref={drop} className="grid" style={{left: grid.offsetX, top: grid.offsetY, width: grid.bounds.width, height: grid.bounds.height}}>
      {battle.tokensOnGrid.map((token, i) => (
        <Token key={i} {...token}/>
      ))}
      </div>
    </div>
  );
}