import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      previewUrl,
      name,
      trackId,
      AddFavorite,
      isFavorite,
    } = this.props;
    return (
      <div>
        <p>{ name }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ AddFavorite }
            name={ trackId }
            checked={ isFavorite }
            id={ trackId }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  AddFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
