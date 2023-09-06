import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Loading from '../../components/loading';
import { getUser } from '../../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
    };
  }

  async componentDidMount() {
    await this.handleGetUser();
    this.setState({
      loading: false,
    });
  }

  async handleGetUser() {
    const infoUser = await getUser();
    this.setState({
      user: infoUser,
    });
  }

  render() {
    const {
      user: {
        name,
        email,
        image,
        description,
      },
      loading,
    } = this.state;
    const defaultPerfil = './default_perfil.svg';
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : ''
        }
        <section className="flex flex-col items-center gap-4 bg-green-200 min-h-[100vh]">
          <div className="avatar mt-4">
            <picture className="w-80 rounded">
              <img
                src={ image || defaultPerfil }
                alt="Perfil"
                data-testid="profile-image"
              />
              <Link
                to="/profile/edit"
              >
                Editar perfil
              </Link>
            </picture>
          </div>
          <ul className="mt-4 gap-4">
            <li className="flex gap-4">
              <p>Usuário: </p>
              {name}
            </li>
            <li className="flex gap-4">
              <p>Email: </p>
              {email}
            </li>
            <li>
              <p>Descrição</p>
              <p>
                {description}
              </p>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}
