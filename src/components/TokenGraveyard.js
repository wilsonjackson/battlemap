import React, {useContext} from 'react';
import './TokenGraveyard.css';
import BattleContext from '../contexts/BattleContext';
import Token from './Token';
import {useDrop} from 'react-dnd';

export default function TokenGraveyard() {
  const battle = useContext(BattleContext);

  const [, drop] = useDrop({
    accept: ['token'],
    drop: item => {
      battle.moveTokenToGraveyard(item);
    }
  })

  return (
    <div ref={drop} className="token-graveyard">
      <h3>Graveyard</h3>

      <div className="token-list">
        {battle.tokensInGraveyard.map(token => (
          <div className="dead-token">
            <Token {...token}/>
          </div>
        ))}
      </div>
    </div>
  )
}