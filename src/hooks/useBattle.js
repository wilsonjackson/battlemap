import {useState} from "react";
import useStorage from "./useStorage";

export const initialState = {
  map: null,
  nextTokenId: 1,
  tokenNumbers: {},
  protoTokens: [],
  tokensOnGrid: []
};

export default function useBattle(grid) {
  const [battle, updateBattle] = useState(initialState);

  useStorage('battle_state', [battle],
    () => battle,
    (state) => {
      if (state) updateBattle(Object.assign({}, state));
      else updateBattle(Object.assign({}, initialState));
    });

  const battleController = {
    addProtoToken(token) {
      updateBattle(Object.assign({}, battle, {
        protoTokens: [].concat(battle.protoTokens, [token])
      }))
    },
    addToken(token) {
      const tokenNumbers = Object.assign({}, battle.tokenNumbers, {
        [token.name]: (battle.tokenNumbers[token.name] || 0) + 1
      });
      updateBattle(Object.assign({}, battle, {
        nextTokenId: battle.nextTokenId + 1,
        tokenNumbers,
        tokensOnGrid: [].concat(battle.tokensOnGrid, [{
          ...token,
          hp: token.maxHp,
          id: battle.nextTokenId,
          number: tokenNumbers[token.name],
          zIndex: Math.abs(grid.height - token.y) + token.x
        }])
      }));
    },
    updateToken(token) {
      updateBattle(Object.assign({}, battle, {
        tokensOnGrid: battle.tokensOnGrid.map(t => {
          return t.id === token.id ? {...token} : t;
        })
      }));
    }
  }

  function Battle() {
  }

  Battle.prototype = battle;
  return Object.assign(new Battle(), battleController);
}