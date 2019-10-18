import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink, Redirect, useHistory } from 'react-router-dom';

import './App.css';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Secret from './Secret';

const App = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  const logoutHandler = () => {
    setIsLogin(false);
    setLogin(null);
    setPassword(null);
    history.push({ pathname: '/home' });
  };

  return (
    <>
      <header className="header">
        <nav className="nav header__nav">
          <NavLink to="/home" activeClassName="nav__link_active" className="nav__link">
            Главная
          </NavLink>
          {!isLogin && (
            <>
              <NavLink to="/signup" activeClassName="nav__link_active" className="nav__link">
                Регистрация
              </NavLink>
              <NavLink to="/login" activeClassName="nav__link_active" className="nav__link">
                Вход
              </NavLink>
            </>
          )}
          {isLogin && (
            <NavLink to="/secret" activeClassName="nav__link_active" className="nav__link">
              Секрет
            </NavLink>
          )}
        </nav>
        {isLogin && (
          <div className="header__logout">
            <span className="header__logout__caption">Пользователь:</span>
            <div className="header__logout__user">{login}</div>
            <div className="header__logout__button" onClick={logoutHandler}>
              выйти
            </div>
          </div>
        )}
      </header>
      <main className="main">
        <Switch>
          <Route exact path="/home" render={() => <Home />} />

          <Route exact path="/signup" render={props => <Signup {...props} user={{ setLogin, setPassword }} />} />

          <Route
            exact
            path="/login"
            render={props => <Login {...props} user={{ setIsLogin, setLogin, setPassword }} />}
          />

          <Route exact path="/secret" render={props => <Secret {...props} user={{ login, password }} />} />

          <Redirect to="/home" />
        </Switch>
      </main>
    </>
  );
};

export default App;
