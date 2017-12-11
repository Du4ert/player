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
    this.onMuteClick = this.onMuteClick.bind(this);
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
    if (this.props.isMuted) this.audio.volume = 0;
  }
  onTimestampChange(value) {
    if (!this.props.trackUrl) return;
    this.props.pause();
    this.props.setTime(value);
    this.audio.currentTime = value;
  }
  onTimestampChangeEnd() {
    this.props.play();
  }
  onVolumeChange(value) {
    this.props.setVolume(value);
    if (value === 0) {
      this.props.mute(true)
    } else {
       this.props.mute(false)
     }
  }
  onMuteClick(value) {
    if (this.props.volume === 0) return;
    this.props.mute(!this.props.isMuted);
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
       isPlaying,
       isMuted,
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
          preload="none"
          autoPlay
        />
        <Range
          className="player-timestamp"
          value={currentTime}
          min={0}
          max={duration}
          onChange={this.onTimestampChange}
          onChangeEnd={this.onTimestampChangeEnd}
         />

         <div className="player-volume-controls">
           <button className={'player-sound ' + (isMuted ? 'player-sound_muted' : '')}
             onClick={this.onMuteClick}>
           </button>
          <Range
            className="player-volume"
            value={volume}
            min={0}
            max={1}
            onChange={this.onVolumeChange}
            onChangeEnd={() => {}}
          />
         </div>

      </div>
    )
  }
}
export default Player;
