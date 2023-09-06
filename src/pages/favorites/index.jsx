import React, { Component } from 'react';
import Header from '../../components/header';
import Loading from '../../components/loading';
import MusicCard from '../../components/musicCard';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      listMusic: [],
    };

    this.handleCreateFavorite = this.handleCreateFavorite.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
  }

  async componentDidMount() {
    await this.handleCreateFavorite();
    this.setState({
      loading: false,
    });
  }

  async handleCreateFavorite() {
    const listFavorite = await getFavoriteSongs();
    this.setState({
      listMusic: [...listFavorite],
    });
  }

  async handleAddFavorite({ target: { id } }) {
    this.setState({
      loading: true,
    });
    const { listMusic } = this.state;
    const songFavorite = listMusic.filter(({ trackId }) => (
      trackId === Number(id)
    ));
    await removeSong(songFavorite[0]);
    await this.handleCreateFavorite();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, listMusic } = this.state;
    const isFavorite = listMusic.map((song) => song.trackId);
    return (
      <div
        data-testid="page-favorites"
        className="bg-green-300 flex flex-col items-center gap-4 min-h-[100vh]"
      >
        <Header />
        {loading && <Loading /> }
        <div
          className="flex flex-col gap-4 md:grid md:grid-cols-2
         lg:grid-cols-3 2xl:grid-cols-4"
        >
          {listMusic.map(({ previewUrl, trackId, trackName }) => (
            <MusicCard
              key={ trackId }
              trackId={ trackId }
              previewUrl={ previewUrl }
              name={ trackName }
              isFavorite={ isFavorite.includes(trackId) }
              AddFavorite={ this.handleAddFavorite }
            />
          ))}
        </div>
      </div>
    );
  }
}
