import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/musicCard';
import Loading from '../../components/loading';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      listMusic: [],
      loading: false,
      listSongFavorite: [],
    };

    this.handleGetMusics = this.handleGetMusics.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.handleGetMusics(id);
  }

  async handleGetSong() {
    const listFavorite = await getFavoriteSongs();
    const songFavorite = listFavorite.flatMap((song) => song);
    this.setState({
      listSongFavorite: [...songFavorite],
    });
  }

  async handleGetMusics(id) {
    const musics = await getMusics(id);
    const { artistName, collectionName } = musics[0];
    this.setState({
      artistName,
      collectionName,
      listMusic: [...musics],
    });
  }

  async handleAddFavorite({ target: { id, checked } }) {
    this.setState({
      loading: true,
    });
    const { listMusic, listSongFavorite } = this.state;
    if (checked) {
      const listFavorite = listMusic.filter(({ trackId }) => trackId === Number(id));
      await addSong(listFavorite[0]);
    } else {
      const listFavorite = listSongFavorite.filter(({ trackId }) => (
        trackId === Number(id)
      ));
      await removeSong(listFavorite[0]);
    }
    await this.handleGetSong();
    this.setState({
      loading: false,
    });
  }

  render() {
    this.handleGetSong();
    const {
      artistName,
      collectionName,
      listMusic,
      loading,
      listSongFavorite,
    } = this.state;
    const isFavorite = listSongFavorite.map((song) => song.trackId);
    return (
      <div
        data-testid="page-album"
        className="flex flex-col items-center gap-4 bg-green-300 min-h-[100vh]"
      >
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        {loading && <Loading /> }
        <p data-testid="album-name">{ collectionName }</p>
        <div
          className="flex flex-col gap-4 md:grid md:grid-cols-2
         lg:grid-cols-3 2xl:grid-cols-4"
        >
          {listMusic.map(({ previewUrl, trackId, trackName }, index) => (
            index > 0 && <MusicCard
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

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.string.isRequired,
  ).isRequired,
};
