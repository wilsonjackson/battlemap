import React from "react";
import {useDrag} from "react-dnd";

export default function Token(props) {
  const {color, name, number, width, height, left, top} = props;
  const [{isDragging}, drag] = useDrag({
    item: Object.assign({}, props, {
      type: 'token'
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const style = {
    ...(width ? {width} : null),
    ...(height ? {height} : null),
    ...(width ? {fontSize: `${width / 1.75}px`} : null),
    left,
    top,
    opacity: isDragging ? '0.5' : '1',
    backgroundColor: color
  };

  return (
    <div ref={drag} className="token" style={style}>
      <span className="name">{name[0]}</span>
      {number && <span className="number">{number}</span>}
    </div>
  );
}