import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const userName = await getUser();
    const { name } = userName;
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    const name = <p data-testid="header-user-name">{ userName }</p>;
    return (
      <div data-testid="header-component" className="w-full">
        <p className="flex bg-green-400">
          {loading ? <Loading /> : (
            <spam className="flex gap-2">
              Logado com:
              {' '}
              {name}
            </spam>
          )}
        </p>
        <ul className="bg-green-400 flex justify-evenly p-2">
          <li className="flex justify-evenly w-[800px]">
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="bg-green-700 rounded-md p-2 text-white font-medium flex
                align-middle shadow-xl"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="bg-green-700 rounded-md p-2 text-white font-medium flex
                align-middle shadow-xl"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="bg-green-700 rounded-md p-2 text-white font-medium flex
                align-middle shadow-xl"
              >
                Profile
              </Link>
            </li>
          </li>
        </ul>
      </div>
    );
  }
}
