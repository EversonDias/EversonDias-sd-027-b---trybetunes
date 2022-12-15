import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const { artist } = this.props;
    return (
      <div>
        <p>Resultado de álbuns de:</p>
        {artist.map(({ artistName, collectionId }) => (
          <Link
            key={ collectionId }
            to={ `/album/${collectionId}` }
          >
            <div
              data-testid={ `link-to-album-${collectionId}` }
            >
              { artistName }
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artist: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
