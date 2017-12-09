import {
  PLAY,
  PAUSE,
  NEXT,
  PREV,
  SELECT_TRACK,
  FILTER,
  SET_TIME,
  SET_VOLUME

} from '../constants';

export function nextTrack(currentTrack) {
  return (dispatch) => {
    dispatch({
      type: NEXT
    })
  }
}

export function prevTrack(currentTrack) {
  return (dispatch) => {
    dispatch({
      type: PREV
    })
  }
}

export function pause() {
  return (dispatch) => {
    dispatch({
      type: PAUSE
    })
  }
}

export function play() {
  return (dispatch) => {
    dispatch({
      type: PLAY
    })
  }
}

export function setTrack(id) {
  return (dispatch) => {
    dispatch({
      type: SELECT_TRACK,
      payload: id
    })
  }
}

export function filter(filter) {
  return (dispatch) => {
    dispatch({
      type: FILTER,
      payload: filter
    })
  }
}

export function setTime(time) {
  return (dispatch) => {
    dispatch({
      type: SET_TIME,
      payload: time
    })
  }
}
export function setVolume(volume) {
  return (dispatch) => {
    dispatch({
      type: SET_VOLUME,
      payload: volume
    })
  }
}
