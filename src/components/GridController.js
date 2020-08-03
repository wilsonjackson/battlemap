import React from "react";
import './GridController.css';

export default function GridController({grid, update}) {
  return (
    <div className="grid-controller form">
      <label>Grid Width
        <input type="number" value={grid.width}
               onChange={e => update({width: parseInt(e.target.value, 10)})}/>
      </label>
      <label>Grid X-Offset
        <input type="number" name="grid-offset-x" value={grid.offsetX}
               onChange={e => update({offsetX: parseInt(e.target.value, 10)})}/>
      </label>
      <label>Grid Y-Offset
        <input type="number" name="grid-offset-y" value={grid.offsetY}
               onChange={e => update({offsetY: parseInt(e.target.value, 10)})}/>
      </label>
      <label>Show Grid
        <span>
          <input type="checkbox" checked={grid.show} onChange={e => update({show: e.target.checked})}/>
        </span>
      </label>
    </div>
  );
}