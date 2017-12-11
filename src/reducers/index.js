import tracks from '../store/tracks.json';


import {
  PLAY,
  PAUSE,
  SELECT_TRACK,
  SET_FILTER,
  NEXT,
  PREV,
  SET_TIME,
  SET_VOLUME,
  SET_MUTE
} from '../constants';

const initialState = {
  trackId: '',
  currentTime: 0,
  timer: null,
  isPlaying: false,
  volume: 0.5,
  isMuted: false,
  searchFilter: '',
  tracks: tracks,
  filteredTracks: tracks
}

function getTrackData(state) {
  return state.tracks.filter(track => state.trackId === track.id)[0];
}

function switchTrack(state, direction) {
  let currentIndex = -1;
  let tracksLength = state.filteredTracks.length;
  state.filteredTracks.forEach((track, index) => {
    if (state.trackId === track.id) {
      currentIndex = index;
      return;
    }
  })
  let nextIndex = 0;
  if (direction === 'forwards') {
    nextIndex = currentIndex + 1 < tracksLength ? currentIndex + 1 : 0;

  } else if (direction === 'backwards') {
    nextIndex = currentIndex - 1 < 0 ? tracksLength - 1 : currentIndex - 1;
  }
  return state.filteredTracks[nextIndex].id;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload
      }
    case SET_MUTE:
      return {
        ...state,
        isMuted: action.payload
      }
    case SET_TIME:
      return {
        ...state,
        currentTime: action.payload
      }
    case PLAY:
      return {
        ...state,
        isPlaying: true,
        trackId: state.trackId === '' ? state.tracks[0].id : state.trackId
      }
    case PAUSE:
      return {
        ...state,
        isPlaying: false
      }
    case SELECT_TRACK:
      return {
        ...state,
        currentTime: state.trackId === action.payload ? state.currentTime : 0,
        trackId: action.payload
      }
    case NEXT:
      return {
        ...state,
        trackId: switchTrack(state, 'forwards'),
        isPlaying: true,
        currentTime: 0
      }
    case PREV:
      return {
        ...state,
        trackId: switchTrack(state, 'backwards'),
        isPlaying: true,
        currentTime: 0
      }
    case SET_FILTER:
      return {
        ...state,
        searchFilter: action.payload,
      }
    default:
      return state;
  }
}
