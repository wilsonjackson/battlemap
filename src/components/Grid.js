import React, {useContext, useEffect, useState} from 'react';
import BattleContext from "../contexts/BattleContext";
import TokenContext from "../contexts/TokenContext";
import {useDrop} from "react-dnd";
import {GridLines} from "./GridLines";
import GridToken from "./GridToken";
import './Grid.css';

export default function Grid({grid}) {
  const {setToken} = useContext(TokenContext);
  const battle = useContext(BattleContext);
  const [speedToken, setSpeedToken] = useState(null);
  const normalizeCoords = ({x, y}) => ({x: x - grid.bounds.left, y: y - grid.bounds.top});
  const coordsToCell = ({x, y}) => ({x: Math.floor(x / grid.tileSize), y: Math.floor(y / grid.tileSize)});
  const cellToCoords = ({x, y}) => ({x: x * grid.tileSize, y: y * grid.tileSize});

  const [, drop] = useDrop({
    accept: ['token', 'protoToken'],
    hover: (item, monitor) => {
      if (item.type === 'token' && (!speedToken || item.id !== speedToken.id)) {
        setSpeedToken(item);
      }
    },
    drop: (item, monitor) => {
      const {x, y} = coordsToCell(normalizeCoords(monitor.getClientOffset()));
      const {x: left, y: top} = cellToCoords({x, y});
      const token = {...item, width: grid.tileSize, height: grid.tileSize, x, y, left, top, zIndex: Math.abs(grid.height - y) + x};
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
      {speedToken && <div className="speed-radius" style={{
        width: grid.tileSize + grid.tileSize * (speedToken.speed / grid.ftPerTile) * 2,
        height: grid.tileSize + grid.tileSize * (speedToken.speed / grid.ftPerTile) * 2,
        left: speedToken.left - (grid.tileSize * (speedToken.speed / grid.ftPerTile)),
        top: speedToken.top - (grid.tileSize * (speedToken.speed / grid.ftPerTile))
      }}/>}
      <div ref={drop} className="grid" onClick={() => setToken(null)}
           style={{left: grid.offsetX, top: grid.offsetY, width: grid.bounds.width, height: grid.bounds.height}}>
        {battle.tokensOnGrid.map(token => (
          <GridToken key={token.id} endDrag={() => setSpeedToken(null)} {...token}/>
        ))}
      </div>
    </div>
  );
}
