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
        actions.pause();
      } else {
        actions.play();
      }
    } else {
      actions.setTrack(id);
      actions.play();
    }
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
      pause={actions.pause}
      play={actions.play}
      next={actions.nextTrack}
      prev={actions.prevTrack}
      trackEnd={actions.nextTrack}
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
