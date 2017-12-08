import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import '../styles/range.scss';

const Range = ({value, max, min, onChange, className}) => {
  return (
    <div className={className}>
      <div className="filler"></div>
    </div>
  )
}

export default Range;
