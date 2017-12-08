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
  const trackSelectHandler = (id) => {
    if (id === state.trackId) {
      if (state.isPlaying) {
        pauseHandler();
      } else {
        playHandler();
      }
    } else {
      actions.setTrack(id);
      playHandler();
    }
  }
  function timeCalcStart() {
    unsetTimer();
    actions.setTimerId(setInterval(actions.tick, 1000));
  }
  function unsetTimer() {
    if (state.timerId) clearInterval(state.timerId);
  }
  function pauseHandler() {
    clearInterval(state.timerId);
    actions.pause();
  }
  function playHandler() {
    timeCalcStart();
    actions.play();
  }
  function nextHandler() {
    timeCalcStart();
    actions.nextTrack();
  }
  function prevHandler() {
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
      pause={pauseHandler}
      play={playHandler}
      next={nextHandler}
      prev={prevHandler}
      trackEnd={nextHandler}
      setVolume={actions.setVolume}
    />
    <Playlist tracks={state.filteredTracks}
        selected={state.trackId}
        currentTime={state.currentTime}
        filter={state.searchFilter}
        onTrackClick={trackSelectHandler}
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
