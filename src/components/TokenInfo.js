import React, {useCallback, useContext, useEffect} from 'react';
import './TokenInfo.css';
import TokenContext, {sub, unsub} from '../contexts/TokenContext';
import BattleContext from "../contexts/BattleContext";
import useKeys from "../hooks/useKeys";

export default function TokenInfo() {
  const battle = useContext(BattleContext);
  const {token, setToken} = useContext(TokenContext);
  const keys = useKeys({
    'd': () => doDamage(),
    'h': () => doHeal()
  });

  const updateToken = useCallback(changes => {
    battle.updateToken({...token, ...changes});
    setToken({...token, ...changes});
  }, [token, setToken, battle]);
  const doDamage = useCallback(() => {console.log('do damage')}, []);
  const doHeal = useCallback(() => {console.log('do heal')}, []);
  const changeSpeed = useCallback(speed => updateToken({speed}), [updateToken]);

  useEffect(() => {
    const subscriber = {dmg: doDamage, heal: doHeal, speed: changeSpeed};
    sub(subscriber);
    return () => unsub(subscriber);
  }, [doDamage, doHeal, changeSpeed]);

  return token && (
    <div ref={keys} className="token-info">
      <h3>{token.name} ({token.number})</h3>

      <div className="state">
        <div className="attribute">
          <span>HP</span>
          <span>{token.hp}/{token.maxHp}</span>
          <button type="button" onClick={() => doDamage()}>DMG</button>
          <button type="button" onClick={() => doHeal()}>HEAL</button>
        </div>
        <div className="attribute">
          <span>Speed</span>
          <input type="number" value={token.speed} onChange={e => changeSpeed(e.target.value)}/>
        </div>
      </div>
    </div>
  );
};
