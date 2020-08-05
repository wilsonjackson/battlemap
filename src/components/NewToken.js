import React, {useState} from "react";

export const NewToken = ({addToken}) => {
  const [tokenInfo, updateTokenInfo] = useState({name: '', maxHp: 0, speed: 30});
  const update = i => updateTokenInfo(Object.assign({}, tokenInfo, i));
  return (
    <div className="new-token form">
      <h3>New Token</h3>
      <label>
        Name
        <input type="text" placeholder="Token Name" value={tokenInfo.name}
               onChange={e => update({name: e.target.value})}/>
      </label>
      <label>
        Hit points
        <input type="number" value={tokenInfo.maxHp}
               onChange={e => update({maxHp: parseInt(e.target.value || 0, 10)})}/>
      </label>
      <label>
        Speed (ft)
        <input type="number" value={tokenInfo.speed}
               onChange={e => update({speed: parseInt(e.target.value || 0, 10)})}/>
      </label>
      <button type="button" onClick={() => addToken(tokenInfo)}>Add</button>
    </div>
  );
};