import React, {useContext, useEffect, useRef} from 'react';
import Token from './Token';
import {useDrag} from 'react-dnd';
import composeRefs from '@seznam/compose-react-refs/composeRefs';
import useKeys from '../hooks/useKeys';
import './GridToken.css';
import TokenContext, {pub} from '../contexts/TokenContext';

export default function GridToken(props) {
  const {id, zIndex, width, height, left, top, endDrag} = props;
  const self = useRef();
  const tokenContext = useContext(TokenContext);
  const keys = useKeys({
    'd': () => pub('dmg'),
    'h': () => pub('heal')
  });
  const [{isDragging}, drag] = useDrag({
    item: Object.assign({}, props, {
      type: 'token'
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: endDrag
  });

  // noinspection JSUnusedGlobalSymbols
  const handlers = {
    onMouseDown: () => {
      setTimeout(() => {
        if (!tokenContext.token || tokenContext.token.id !== id)
          tokenContext.setToken(props);
      });
    },
    onClick: e => e.stopPropagation()
  };

  useEffect(() => {
    /** @var {HTMLElement} */
    const el = self.current;
    if (tokenContext.token && tokenContext.token.id === id)
      el.focus();
  });

  const style = {
    zIndex: zIndex,
    ...(width ? {width} : null),
    ...(height ? {height} : null),
    ...(width ? {fontSize: `${width / 1.75}px`} : null),
    left,
    top,
    visibility: isDragging ? 'hidden' : 'visible'
  };

  return (
    <div ref={composeRefs(self, drag, keys)} className="grid-token" tabIndex="-1" style={style} {...handlers}>
      <Token {...props}/>
    </div>
  );
};
