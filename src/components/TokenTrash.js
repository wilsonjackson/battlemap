import React from 'react';
import './TokenTrash.css';
import {useDrop} from 'react-dnd';

export default function TokenTrash({onDrop}) {
  const [, drop] = useDrop({
    accept: ['protoToken'],
    drop: onDrop
  });

  return (
    <div ref={drop} className="token-trash">X</div>
  );
}