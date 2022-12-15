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
      <div data-testid="header-component">
        {loading ? <Loading /> : name}
        <ul>
          <li>
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
