import React, {useContext, useState} from "react";
import BattleContext from "../contexts/BattleContext";
import {NewToken} from "./NewToken";
import ProtoToken from "./ProtoToken";
import './TokenPalette.css';
import TokenTrash from './TokenTrash';

export default function TokenPalette() {
  const battle = useContext(BattleContext);
  const [uiState, updateUi] = useState({newToken: false});

  const newToken = () => updateUi(Object.assign({}, uiState, {newToken: true}));

  const addToken = tokenInfo => {
    battle.addProtoToken(tokenInfo);
    updateUi(Object.assign({}, uiState, {newToken: false}));
  };

  const deleteToken = tokenInfo => {
    battle.deleteProtoToken(tokenInfo);
  };

  return (
    <div className="token-palette">
      <div className="token-controls">
        <button type={"button"} onClick={newToken}>Add token</button>
        <TokenTrash onDrop={deleteToken}/>
      </div>
      <div className="token-list">
        {battle.protoTokens.map((token, i) => (
          <ProtoToken key={i} {...token}/>
        ))}
      </div>
      {uiState.newToken && <NewToken addToken={addToken}/>}
    </div>
  );
};
