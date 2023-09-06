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
        <p className="mb-4 text-white font-medium">
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
        <form
          className="bg-green-400 p-4 flex justify-evenly"
        >
          <input
            type="text"
            data-testid="search-artist-input"
            value={ input }
            onChange={ this.handleOnChangeInput }
            className="bg-white border-none rounded-md indent-2 p-2"
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleOnClickButton }
            className="text-white font-medium bg-green-900 p-3 rounded-md
            active:bg-green-700"
          >
            Pesquisar
          </button>
        </form>
        <p
          className="bg-green-400 p-4 flex justify-evenly min-h-[80vh]"
        >
          {isMessage && this.title()}
          {loading && <Loading /> }
        </p>
      </div>
    );
  }
}
