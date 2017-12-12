import React from 'react';
import PropTypes from 'prop-types';
import '../styles/track.scss';

const Track = ({
  author,
  selected,
  url,
  name,
  duration,
  currentTime
}) => {
  let time = selected ? currentTime : duration;
  function formTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec;
  }
  return (
    <div className={"track " + (selected ? "track_selected" : "" )}>
      <span className="track-author">{author.toUpperCase()} - </span>
      <span className="track-name">{name}</span>
      <span className="track-duration">{formTime(time)}</span>
    </div>
  )
}
Track.propTypes = {
  author: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  duration: PropTypes.string,
  currentTime: PropTypes.number
}
export default Track;
