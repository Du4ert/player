import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../styles/player.scss';
import Range from './Range';

class Player extends PureComponent
{
  constructor(props) {
    super(props);
    this.timer;
    this.onTimestampChange = this.onTimestampChange.bind(this);
    this.onTimestampChangeEnd = this.onTimestampChangeEnd.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.setTime(this.audio.currentTime)
    }, 1000)
  }
  componentWilUnmount() {
    clearInterval(this.timer);
  }
  componentDidUpdate() {
    if (this.props.isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.audio.volume = this.props.volume;
  }
  onTimestampChange(value) {
    this.props.pause();
    this.props.setTime(value);
    this.audio.currentTime = value;
  }
  onTimestampChangeEnd() {
    this.props.play();
  }
  onVolumeChange(value) {
    this.props.setVolume(value);
  }
  render()
  {
    const {
       play,
       pause,
       prev,
       next,
       trackEnd,
       duration,
       volume,
       currentTime,
       trackUrl,
       isPlaying
    } = this.props;

    return (
      <div className="player">
        <div className="player-buttons">
          <button className="player-btn btn-prev" onClick={prev}></button>
          {
            isPlaying ?
            <button className="player-btn btn-pause" onClick={pause}></button>:
            <button className="player-btn btn-play" onClick={play}></button>
          }
          <button className="player-btn btn-next" onClick={next}></button>
        </div>
        <audio src={trackUrl}
          ref={elem => this.audio = elem}
          onEnded={trackEnd}
          preload="true"
        />
        <Range
          className="player-timestamp"
          value={currentTime}
          min={0}
          max={duration}
          onChange={this.onTimestampChange}
          onChangeEnd={this.onTimestampChangeEnd}
         />
        <Range
          className="player-volume"
          value={volume}
          min={0}
          max={1}
          onChange={this.onVolumeChange}
          onChangeEnd={() => {}}
        />
      </div>
    )
  }
}
export default Player;
