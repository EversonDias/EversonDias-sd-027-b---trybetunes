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
      input: '',
      fetchedArtist: '',
      loading: false,
      artist: '',
      isMessage: false,
    };
    this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
    this.title = this.title.bind(this);
  }

  handleOnChangeInput(input) {
    const { target: { value } } = input;
    this.setState({
      input: value,
      fetchedArtist: value,
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
    const { fetchedArtist } = this.state;
    this.setState({
      input: '',
      loading: true,
      isMessage: true,
    });
    const artistName = await searchAlbumsApi(fetchedArtist);
    this.setState({
      loading: false,
      artist: [...artistName],
    });
  }

  title() {
    const { fetchedArtist, artist, loading } = this.state;
    const ONE = 1;
    const message = <p>Nenhum álbum foi encontrado</p>;
    const messageErro = loading === false && artist.length < ONE;
    return (
      <div>
        <p>
          {`Resultado de álbuns de: ${fetchedArtist}`}
        </p>
        {messageErro && message}
        {!loading && <CardAlbum
          artist={ artist }
        />}
      </div>
    );
  }

  render() {
    const {
      isDisabled,
      input,
      loading,
      isMessage,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ input }
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
        {isMessage && this.title()}
        {loading && <Loading /> }
      </div>
    );
  }
}
