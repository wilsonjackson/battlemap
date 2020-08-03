import React, {useContext, useEffect} from "react";
import BattleContext from "../contexts/BattleContext";
import {useDrop} from "react-dnd";
import {GridLines} from "./GridLines";
import GridToken from "./GridToken";
import './Grid.css';

export default function Grid({grid}) {
  const battle = useContext(BattleContext);
  const normalizeCoords = ({x, y}) => ({x: x - grid.bounds.left, y: y - grid.bounds.top});
  const coordsToCell = ({x, y}) => ({x: Math.floor(x / grid.tileSize), y: Math.floor(y / grid.tileSize)});
  const cellToCoords = ({x, y}) => ({x: x * grid.tileSize, y: y * grid.tileSize});

  const [, drop] = useDrop({
    accept: ['token', 'protoToken'],
    drop: (item, monitor) => {
      const {x, y} = coordsToCell(normalizeCoords(monitor.getClientOffset()));
      const {x: left, y: top} = cellToCoords({x, y});
      const token = {...item, width: grid.tileSize, height: grid.tileSize, x, y, left, top};
      switch (item.type) {
        case 'protoToken':
          battle.addToken(token);
          break;
        case 'token':
          battle.updateToken(token);
          break;
        default:
          console.log(`Unexpected drop item type: ${item.type}`);
      }
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
      <div ref={drop} className="grid"
           style={{left: grid.offsetX, top: grid.offsetY, width: grid.bounds.width, height: grid.bounds.height}}>
        {battle.tokensOnGrid.map(token => (
          <GridToken key={token.id} {...token}/>
        ))}
      </div>
    </div>
  );
}
