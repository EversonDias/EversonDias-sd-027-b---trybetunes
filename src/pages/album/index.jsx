import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/musicCard';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from '../../components/loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      listMusic: [],
      loading: false,
    };

    this.handleGetMusics = this.handleGetMusics.bind(this);
    this.handleAddFavorite = this.handleAddFavorite.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.handleGetMusics(id);
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
    } = this.state;
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
