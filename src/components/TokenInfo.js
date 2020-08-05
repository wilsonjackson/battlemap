import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './TokenInfo.css';
import TokenContext, {sub, unsub} from '../contexts/TokenContext';
import BattleContext from '../contexts/BattleContext';
import useKeys from '../hooks/useKeys';

export default function TokenInfo() {
  const battle = useContext(BattleContext);
  const {token, setToken} = useContext(TokenContext);
  const keys = useKeys({
    'd': () => doDamage(),
    'h': () => doHeal()
  });
  const [uiState, updateUi] = useState({heal: false, dmg: false});
  const [hpDelta, setHpDelta] = useState(0);
  const hpDeltaField = useRef();

  const updateToken = useCallback(changes => {
    battle.updateToken({...token, ...changes});
    setToken({...token, ...changes});
  }, [token, setToken, battle]);
  const doDamage = useCallback(() => updateUi({...uiState, ...{dmg: true}}), [uiState]);
  const doHeal = useCallback(() => updateUi({...uiState, ...{heal: true}}), [uiState]);
  const applyHp = useCallback(delta => {
    updateToken({hp: token.hp + delta});
    updateUi({...uiState, ...{heal: false, dmg: false}});
    setHpDelta(0);
  }, [token, updateToken, uiState]);
  const changeSpeed = useCallback(speed => updateToken({speed}), [updateToken]);

  useEffect(() => {
    const subscriber = {dmg: doDamage, heal: doHeal, speed: changeSpeed};
    sub(subscriber);
    return () => unsub(subscriber);
  }, [doDamage, doHeal, changeSpeed]);

  useEffect(() => {
    if (hpDeltaField.current && hpDeltaField.current.value === '0') {
      hpDeltaField.current.select();
    }
  });

  return token && (
    <div ref={keys} className="token-info" tabIndex="-1">
      <h3>{token.name} ({token.number})</h3>

      <div className="stat">
        <span className="name">HP</span>
        <span className="value">{token.hp}/{token.maxHp}</span>
        <button type="button" onClick={() => doDamage()}>DMG</button>
        <button type="button" onClick={() => doHeal()}>HEAL</button>
        {(uiState.heal || uiState.dmg) && (
          <div className="hp-mod">
            {uiState.heal ? 'Heal' : 'Damage'}:
            <input type="number" value={hpDelta} ref={hpDeltaField}
                   onChange={e => setHpDelta(parseInt(e.target.value || 0, 10))}
                   onKeyUp={e => e.key === 'Enter' && applyHp(hpDelta * (uiState.dmg ? -1 : 1))}/>
          </div>
        )}
      </div>
      <div className="stat">
        <span className="name">Speed</span>
        <input className="value" type="number" value={token.speed} onChange={e => changeSpeed(e.target.value)}/>
      </div>
    </div>
  );
};
