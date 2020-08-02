import React, {useContext} from "react";
import {useDrag} from "react-dnd";
import BattleContext from "../contexts/BattleContext";

export default function Token(props) {
  const {color, name, number, maxHp, hp, width, height, left, top} = props;
  const battle = useContext(BattleContext);

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

  const update = changes => {
    battle.updateToken(Object.assign({}, props, changes));
  };

  return (
    <div ref={drag} className="token" style={style} onClick={() => update({hp: hp - 1})}>
      <span className="name">{name[0]}</span>
      {number && <span className="number">{number}</span>}
      {'hp' in props && (
        <div className="health">
          <div className="current" style={{width: `${hp > 0 ? Math.round(hp / maxHp * 100) : 0}%`}}/>
        </div>
      )}
    </div>
  );
}