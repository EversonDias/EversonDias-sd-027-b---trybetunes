import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/musicCard';
import Loading from '../../components/loading';
import { addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';

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

  componentWillMount() {
    this.handleGetSong();
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.handleGetMusics(id);
    this.setState({
      loading: true,
    });
    this.setState({
      loading: false,
    });
  }

  componentDidUpdate() {
    // this.handleGetSong();
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
    const { listMusic } = this.state;
    if (checked) {
      const favoriteSong = listMusic.filter(({ trackId }) => trackId === Number(id));
      console.log(favoriteSong);
      await addSong(favoriteSong);
    }
    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      artistName,
      collectionName,
      listMusic,
      loading,
      listSongFavorite,
    } = this.state;
    const isFavorite = listSongFavorite.map((song) => song.trackId);
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        {loading && <Loading /> }
        <p data-testid="album-name">{ collectionName }</p>
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
    );
  }
}

Album.propTypes = {
  match: PropTypes.object.isRequired,
};
