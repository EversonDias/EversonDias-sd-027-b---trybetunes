import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/musicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      listMusic: [],
    };

    this.handleGetMusics = this.handleGetMusics.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.handleGetMusics(id);
  }

  async handleGetMusics(id) {
    const musics = await getMusics(id);
    console.log(musics);
    const { artistName, collectionName } = musics[0];
    this.setState({
      artistName,
      collectionName,
      listMusic: [...musics],
    });
  }

  render() {
    const {
      artistName,
      collectionName,
      listMusic,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        {listMusic.map(({ trackViewUrl, trackId }, index) => (
          index > 0 && <MusicCard
            key={ trackId }
            previewUrl={ trackViewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.string,
    ),
  ).isRequired,
};
