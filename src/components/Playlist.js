import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';
import '../styles/playlist.scss';

const Playlist = ({
  tracks,
  selected,
  currentTime,
  filter,
  onTrackClick,
  onSearch
 }) => {
  const onTrackClickHandler = (id) => {
    onTrackClick(id);
  }
  const onSearchHandler = (event) => {
    onSearch(event.target.value);
  }
  return (
    <div className="playlist">
      <input type="text"
        className="playlist-search"
        placeholder="Search for artists or tracks"
        onChange={onSearchHandler}/>
      <ul className="playlist-list">
        {
          tracks.map((track) => (
            <li key={track.id}
                onClick={onTrackClickHandler.bind(null, track.id)}>
              <Track
                    author={track.author}
                    selected={ track.id === selected }
                    url={track.url}
                    name={track.name}
                    currentTime={currentTime}
                    duration={track.duration}
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Playlist;
