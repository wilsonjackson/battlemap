import {useState} from "react";
import useStorage from "./useStorage";

const initialState = {
  map: null,
  show: true,
  width: 32,
  height: 0,
  tileSize: 0,
  ftPerTile: 5,
  offsetX: 1,
  offsetY: 1,
  bounds: {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }
};

export default function useGrid() {
  const [grid, updateGrid] = useState(initialState);

  useStorage('grid_state', [grid],
    () => ({
      show: grid.show,
      width: grid.width,
      ftPerTile: grid.ftPerTile,
      offsetX: grid.offsetX,
      offsetY: grid.offsetY
    }),
    state => {
      if (state) updateGrid({...grid, ...state});
      else updateGrid({...initialState});
    });

  const gridController = {
    update(overrides) {
      updateGrid({...grid, ...overrides});
    },
    get tileSize() {
      return grid.bounds.width / grid.width;
    },
    get height() {
      return Math.round(grid.bounds.height / gridController.tileSize);
    }
  };

  function Grid() {
  }

  Grid.prototype = grid;
  return Object.assign(new Grid(), gridController);
}
