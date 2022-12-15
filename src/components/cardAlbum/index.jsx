import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CardAlbum extends Component {
  render() {
    const {
      artist,
    } = this.props;
    return (
      <>
        {artist.map(({ collectionId, collectionName }) => (
          <Link
            key={ collectionId }
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <div>
              {collectionName}
            </div>
          </Link>
        ))}
      </>
    );
  }
}

CardAlbum.propTypes = {
  artist: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
