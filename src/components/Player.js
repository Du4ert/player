import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/player.scss';

class Player extends Component
{
  componentDidUpdate() {
    if (this.props.isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  onTimestampClickHandler(event)
  {
    if (!this.props.trackUrl) return;
    let secInPx = this.props.duration / parseFloat(this.timestamp.clientWidth);
    let leftX = this.timestamp.getBoundingClientRect().left + window.pageXOffset;
    let time = (event.pageX - leftX) * secInPx;
    this.audio.currentTime = time;
    this.props.setTime(time);
  }
  onVolumeClickHandler(event)
  {
    let volInPx = 1 / parseFloat(this.volume.clientWidth);
    let leftX = this.volume.getBoundingClientRect().left + window.pageXOffset;
    let volume = (event.pageX - leftX) * volInPx;
    this.audio.volume = volume;
    this.props.onVolumeChange(volume);
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
        <div className="player-timestamp"
          ref={elem => this.timestamp = elem}
          onClick={this.onTimestampClickHandler.bind(this)}>
          <div className="timestamp-filler"
            style={{width: this.props.currentTime * percPerSec + '%'}}></div>
        </div>
        <div className="player-volume"
          ref={elem => this.volume = elem}
          onClick={this.onVolumeClickHandler.bind(this)}>
          <div className="volume-filler"
            style={{width: this.props.volume * 100 + '%'}}></div>
        </div>
      </div>
    )
  }
}
export default Player;
