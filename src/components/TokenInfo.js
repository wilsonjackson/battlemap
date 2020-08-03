import React, {useContext} from 'react';
import './TokenInfo.css';
import TokenContext from '../contexts/TokenContext';

export default function TokenInfo() {
  const {token} = useContext(TokenContext);
  return token && (
    <div className="token-info">
      {token.name} ({token.number})
    </div>
  );
};
