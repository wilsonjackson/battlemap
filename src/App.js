import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {load} from './lib/storage';
import './App.css';
import BattleContext from "./contexts/BattleContext";
import Map from "./components/Map";
import Grid from "./components/Grid";
import GridController from "./components/GridController";
import TokenPalette from "./components/TokenPalette";
import useBattle from "./hooks/useBattle";
import useGrid from "./hooks/useGrid";

function App() {
  const battle = useBattle();
  const grid = useGrid();

  return (
    <div className="battlemap">
      <BattleContext.Provider value={battle}>
        <DndProvider backend={HTML5Backend}>
          <Grid grid={grid}/>
          <Map update={grid.update} onSelect={load}/>
          <GridController grid={grid} update={grid.update}/>
          <TokenPalette/>
        </DndProvider>
      </BattleContext.Provider>
    </div>
  );
}

export default App;
