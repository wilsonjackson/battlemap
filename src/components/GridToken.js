import React, {useContext, useState} from "react";
import Token from "./Token";
import {useDrag} from "react-dnd";
import composeRefs from "@seznam/compose-react-refs/composeRefs";
import useKeys from "../hooks/useKeys";
import BattleContext from "../contexts/BattleContext";
import './GridToken.css';
import TokenContext from '../contexts/TokenContext';

export default function GridToken(props) {
  const {hp, zIndex, width, height, left, top} = props;
  const {setToken} = useContext(TokenContext);
  const battle = useContext(BattleContext);
  const updateBattle = changes => battle.updateToken(Object.assign({}, props, changes));
  const keys = useKeys({
    'd': () => updateBattle({hp: hp - 1})
  });
  const [{isDragging}, drag] = useDrag({
    item: Object.assign({}, props, {
      type: 'token'
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });


  // noinspection JSUnusedGlobalSymbols
  const handlers = {
    onFocus: () => setToken(props),
    onBlur: () => setToken(null)
  };

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
    <div ref={composeRefs(drag, keys)} className="grid-token" tabIndex="-1" style={style} {...handlers}>
      <Token {...props}/>
    </div>
  );
};
