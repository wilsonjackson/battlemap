import React from "react";
import './Token.css';

export default function Token(props) {
  const {color, name, number, maxHp, hp} = props;

  const style = {
    backgroundColor: color
  };

  return (
    <div className="token" style={style}>
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