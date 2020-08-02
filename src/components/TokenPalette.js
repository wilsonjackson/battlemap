import React, {useContext, useState} from "react";
import Token from "./Token";
import BattleContext from "../contexts/BattleContext";
import {NewToken} from "./NewToken";

export default function TokenPalette() {
  const battle = useContext(BattleContext);
  const [uiState, updateUi] = useState({newToken: false});

  const newToken = () => updateUi(Object.assign({}, uiState, {newToken: true}));

  const addToken = tokenInfo => {
    battle.addProtoToken(tokenInfo);
    updateUi(Object.assign({}, uiState, {newToken: false}));
  };

  return (
    <div className="token-palette">
      <button type={"button"} onClick={newToken}>Add token</button>
      <div className="token-list">
        {battle.protoTokens.map((token, i) => (
          <Token key={i} {...token}/>
        ))}
      </div>
      {uiState.newToken && <NewToken addToken={addToken}/>}
    </div>
  );
};
