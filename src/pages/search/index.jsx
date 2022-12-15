import React, { Component } from 'react';
import CardAlbum from '../../components/cardAlbum';
import Header from '../../components/header';
import Loading from '../../components/loading';
import searchAlbumsApi from '../../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      search: '',
      loading: false,
      artist: '',
    };
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
  }

  handleOnChangeInput(input) {
    const { target: { value } } = input;
    this.setState({
      search: [value],
    });
    const minCharacters = 2;
    if (value.length >= minCharacters) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  async handleOnClickButton() {
    this.setState({
      search: '',
      loading: true,
    });
    const artistName = await searchAlbumsApi();
    this.setState({
      loading: false,
      artist: [...artistName],
    });
  }

  render() {
    const { isDisabled, search, loading, artist } = this.state;
    console.log(artist);
    const message = <p>Nenhum álbum foi encontrado</p>;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.handleOnChangeInput }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleOnClickButton }
          >
            Pesquisar
          </button>
        </form>
        {loading && <Loading />}
        {artist.length < 1 ? message : <CardAlbum artist={ artist } />}
      </div>
    );
  }
}
