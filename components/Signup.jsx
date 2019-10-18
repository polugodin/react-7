import React, { useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { createUser } from '../source';

const Signup = props => {
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    createUser({ login: newLogin, password: newPassword }).then(() => {
      setRedirect(true);
      setTimeout(() => props.history.push({ pathname: '/login' }), 1000);
    });
  };

  const existHandler = () => props.history.push({ pathname: '/login' });

  return (
    <div className="signup">
      <h2>Страница регистрации</h2>
      {redirect ? (
        <div className="signup__message">Пользователь зарегистрирован. Перенаправление через 1 сек.</div>
      ) : (
        <>
          <form className="signup__form" onSubmit={submitHandler}>
            <label className="signup__form__label">
              <span>Логин: </span>
              <input type="text" value={newLogin} onChange={e => setNewLogin(e.target.value)} required />
            </label>
            <label className="signup__form__label">
              <span>Пароль: </span>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </label>
            <button className="signup__form__button" type="submit">
              Отправить
            </button>
          </form>
          <div className="signup__exist">
            <span>Уже есть аккаунт? </span>
            <span className="signup__exist__button" onClick={existHandler}>
              Войти
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
