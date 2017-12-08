import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/player.scss';
import Range from './Range';

class Player extends Component
{
  componentDidUpdate() {
    if (this.props.isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  render()
  {
    const { onPlayClick, onPauseClick, onPrevClick, onNextClick, onTrackEnd } = this.props;
    const percPerSec = 100 / this.props.duration;
    return (
      <div className="player">
        <div className="player-buttons">
          <button className="player-btn btn-prev" onClick={onPrevClick}></button>
          {
            this.props.isPlaying ?
            <button className="player-btn btn-pause" onClick={onPauseClick}></button>:
            <button className="player-btn btn-play" onClick={onPlayClick}></button>
          }
          <button className="player-btn btn-next" onClick={onNextClick}></button>
        </div>
        <audio src={this.props.trackUrl}
          ref={elem => this.audio = elem}
          onEnded={onTrackEnd}
          preload="true"
        />
        <Range
          className="player-timestamp"
          value={this.props.currentTime}
          min={0}
          max={this.props.duration}
          onChange={()=> {}}
         />
        <Range
          className="player-volume"
          value={this.props.volume}
          min={0}
          max={1}
          onChange={()=> {}}
        />
      </div>
    )
  }
}
export default Player;
