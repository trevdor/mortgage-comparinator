import React, { Component } from 'react';

class CustomTooltip extends Component {
  render() {
    const { label, payload } = this.props;

    return (
      <div className="custom-tooltip" style={{
        width: '150px',
        lineHeight: '12px',
        border: '1px solid #f5f5f5',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px'
      }}>
        <h4>Month { label }</h4>
        <p>Balance: { payload[0].value }</p>
      </div>
    );
  }
}

export default CustomTooltip;
