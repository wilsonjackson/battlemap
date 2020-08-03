import React from "react";
import Token from "./Token";
import {useDrag} from "react-dnd";
import './ProtoToken.css';

export default function ProtoToken(props) {
  const [, drag] = useDrag({
    item: Object.assign({}, props, {
      type: 'protoToken'
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div ref={drag} className="proto-token">
      <Token {...props}/>
    </div>
  );
};
