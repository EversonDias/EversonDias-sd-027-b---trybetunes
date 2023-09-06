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
      <div className="card w-80 bg-green-200 shadow-xl">
        <div
          className="card-body"
        >
          <div
            className="flex gap-4"
          >
            <label htmlFor={ trackId } className="rating">
              {
                isFavorite ? (
                  <input
                    onChange={ AddFavorite }
                    type="checkbox"
                    name="rating-2"
                    id={ trackId }
                    className="mask mask-star-2 bg-orange-400"
                  />
                ) : (
                  <input
                    onChange={ AddFavorite }
                    type="checkbox"
                    name="rating-2"
                    id={ trackId }
                    className="mask mask-star-2 bg-orange-200"
                  />
                )
              }
            </label>
            <p className="card-title">{ name }</p>
          </div>
          <audio
            className="w-64"
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
        </div>
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
