import React, { useState, useEffect } from 'react';

import { secret } from '../source';

const Secret = props => {
  const [info, setInfo] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    secret({ login: props.user.login, password: props.user.password })
      .then(({ data }) => setInfo(data))
      .catch(() => {
        setErrMessage('Вход не выполнен. Перенаправление через 1 сек.');
        setTimeout(() => props.history.push({ pathname: '/login' }), 1000);
      });
  }, []);

  return (
    <div className="secret">
      <h2>Секретная страница</h2>
      <div className="secret__err-message">{errMessage}</div>
      <div className="secret__info">{info}</div>
    </div>
  );
};

export default Secret;
