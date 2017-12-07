import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Player from '../components/Player';
import Playlist from '../components/Playlist';
import * as actions from '../actions';

const App = ({
  state, actions
}) => {
  const trackData = state.tracks.filter(track => track.id === state.trackId)[0] || {};
  const trackClickHandler = (id) => {
    if (id === state.trackId) {
      if (state.isPlaying) {
        pauseClickHandler();
      } else {
        playClickHandler();
      }
    } else {
      actions.setTrack(id);
      playClickHandler();
    }
  }
  function timeCalcStart() {
    unsetTimer();
    actions.setTimerId(setInterval(actions.tick, 1000));
  }
  function unsetTimer() {
    if (state.timerId) clearInterval(state.timerId);
  }
  function pauseClickHandler() {
    clearInterval(state.timerId);
    actions.pause();
  }
  function playClickHandler() {
    timeCalcStart();
    actions.play();
  }
  function nextClickHandler() {
    timeCalcStart();
    actions.nextTrack();
  }
  function prevClickHandler() {
    timeCalcStart();
    actions.prevTrack();
  }
  return (
  <div className="playerApp">
    <Player trackId={trackData.id}
      trackUrl={trackData.url}
      currentTime={state.currentTime}
      duration={trackData.duration}
      volume={state.volume}
      setTime={actions.setTime}
      isPlaying={state.isPlaying}
      onPauseClick={pauseClickHandler}
      onPlayClick={playClickHandler}
      onNextClick={nextClickHandler}
      onPrevClick={prevClickHandler}
      onTrackEnd={nextClickHandler}
      onVolumeChange={actions.setVolume}
    />
    <Playlist tracks={state.filteredTracks}
        selected={state.trackId}
        currentTime={state.currentTime}
        filter={state.searchFilter}
        onTrackClick={trackClickHandler}
        onSearch={actions.filter}
      />
  </div>
)
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
