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
        <form
          className="bg-green-400 p-4 flex justify-center"
        >
          <div className="flex justify-evenly w-[800px]">
            <input
              type="text"
              id="name"
              data-testid="login-name-input"
              onChange={ this.handleUser }
              className="bg-white border-none rounded-md indent-2 p-2"
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isAble }
              onClick={ this.handleLogin }
              className="text-white font-medium bg-green-900 p-3 rounded-md
              active:bg-green-700"
            >
              Entrar
            </button>
          </div>
        </form>
        {loading && <Loading />}
        {authorizedLogin && <Redirect to="/search" />}
        <div
          className="min-h-[95vh] flex items-center justify-center"
        >
          <img src="home-music.svg" alt="passarinho ouvindo musica" />
        </div>
      </div>
    );
  }
}
