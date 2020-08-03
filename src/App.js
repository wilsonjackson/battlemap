import React, {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {load} from './lib/storage';
import './App.css';
import BattleContext from './contexts/BattleContext';
import TokenContext from './contexts/TokenContext';
import Map from './components/Map';
import Grid from './components/Grid';
import GridController from './components/GridController';
import TokenPalette from './components/TokenPalette';
import useBattle from './hooks/useBattle';
import useGrid from './hooks/useGrid';
import TokenInfo from './components/TokenInfo';

export default function App() {
  const grid = useGrid();
  const battle = useBattle(grid);
  const [token, setToken] = useState(null);

  return (
    <div className="battlemap">
      <BattleContext.Provider value={battle}>
        <TokenContext.Provider value={{token, setToken}}>
          <DndProvider backend={HTML5Backend}>
            <Grid grid={grid}/>
            <Map update={grid.update} onSelect={load}/>
            <GridController grid={grid} update={grid.update}/>
            <TokenPalette/>
            <TokenInfo/>
          </DndProvider>
        </TokenContext.Provider>
      </BattleContext.Provider>
    </div>
  );
};
