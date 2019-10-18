import React, { useState } from 'react';

import { loginUser } from '../source';

const Login = props => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState(null);

  const submitHandler = e => {
    e.preventDefault();
    loginUser({ login, password })
      .then(() => {
        props.user.setLogin(login);
        props.user.setPassword(password);
        props.user.setIsLogin(true);
        props.history.push({ pathname: '/home' });
      })
      .catch(() => {
        setErrMessage('Ошибка входа.');
        setTimeout(() => {
          setErrMessage(null);
        }, 1000);
      });
  };

  const unexistHandler = () => props.history.push({ pathname: '/signup' });

  return (
    <div className="login">
      <h2>Страница входа</h2>
      {errMessage && <div className="login__err-message">{errMessage}</div>}
      <form className="login__form" onSubmit={submitHandler}>
        <label className="login__form__label">
          <span>Логин: </span>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} required />
        </label>
        <label className="login__form__label">
          <span>Пароль: </span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button className="login__form__button" type="submit">
          Войти
        </button>
      </form>
      <div className="login__unexist">
        <span>Нет аккаунта? </span>
        <span className="login__unexist__button" onClick={unexistHandler}>
          Зарегистрировать
        </span>
      </div>
    </div>
  );
};

export default Login;
