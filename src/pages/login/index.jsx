import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../../components/loading';
import { createUser } from '../../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isAble: true,
      userName: '',
      loading: false,
      authorizedLogin: false,
    };

    this.handleUser = this.handleUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUser(user) {
    const { target: { value } } = user;
    const minCharacters = 3;
    if (value.length >= minCharacters) {
      this.setState({
        isAble: false,
      });
    } else {
      this.setState({
        isAble: true,
      });
    }
    this.setState({
      userName: value,
    });
  }

  handleLogin() {
    const { userName } = this.state;
    const user = {
      name: userName,
    };
    this.setState({
      loading: true,
    });
    createUser(user);
    this.setState({
      loading: false,
      authorizedLogin: true,
    });
  }

  render() {
    const { isAble, loading, authorizedLogin } = this.state;
    return (
      <div
        data-testid="page-login"
      >
        <form>
          <input
            type="text"
            id="name"
            data-testid="login-name-input"
            onChange={ this.handleUser }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isAble }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
        {loading && <Loading />}
        {authorizedLogin && <Redirect to="/search" />}
      </div>
    );
  }
}
