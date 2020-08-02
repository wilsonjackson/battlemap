import {useState} from "react";
import useStorage from "./useStorage";

const initialState = {
  map: null,
  show: true,
  width: 32,
  height: 0,
  tileSize: 0,
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
      offsetX: grid.offsetX,
      offsetY: grid.offsetY
    }),
    state => {
      if (state) updateGrid(Object.assign({}, grid, state));
      else updateGrid(Object.assign({}, initialState));
    });

  const gridController = {
    update(overrides) {
      updateGrid(Object.assign({}, grid, overrides));
    },
    get tileSize() {
      return grid.bounds.width / grid.width;
    },
    get height() {
      return Math.round(grid.bounds.height / grid.tileSize);
    }
  };

  function Grid() {
  }

  Grid.prototype = grid;
  return Object.assign(new Grid(), gridController);
}
