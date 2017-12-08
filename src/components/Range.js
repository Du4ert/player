import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import '../styles/range.scss';

const Range = ({value, max, min, onChange, onChangeEnd, className}) => {

  const valueRange = max - min;
  const valueToRender = (value / valueRange * 100) + '%';
  let offset;
  let valueInPx;

  const tryValue = (value) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
  const onMouseDownHandler = (e) => {
    e.preventDefault();
    const target = e.target.matches('.filler') ? e.target.parentNode : e.target;
    valueInPx = valueRange / parseFloat(target.clientWidth);
    offset = target.getBoundingClientRect().left + window.pageXOffset;
    const val = (e.pageX - offset) * valueInPx;
    onChange(tryValue(val));
    document.addEventListener('mousemove', onMouseMoveHandler);
    document.addEventListener('mouseup', onMouseUpHandler);
  }
  const onMouseUpHandler = () => {
    onChangeEnd();
    document.removeEventListener('mousemove', onMouseMoveHandler);
    document.removeEventListener('mouseup', onMouseUpHandler);
  }
  const onMouseMoveHandler = (e) => {
    const val = (e.pageX - offset) * valueInPx;
    onChange(tryValue(val));
  }
  return (
    <div className={className} onMouseDown={onMouseDownHandler}>
      <div className="filler" style={{width: valueToRender}}></div>
    </div>
  )
}

export default Range;
