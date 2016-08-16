import React, { Component } from 'react';

class CustomTooltip extends Component {
  render() {
    const { label, payload } = this.props;
    const balance = payload[0].value;
    const locale = window.navigator.userLanguage || window.navigator.language;
    const formattedBalance = Number(balance).toLocaleString(locale, {
      style: 'currency',
      currency: 'USD'
    });

    return (
      <div className="custom-tooltip" style={{
        width: '100px',
        lineHeight: '12px',
        border: '3px solid #eee',
        borderRadius: '5%',
        backgroundColor: 'rgba(230, 249, 220, 0.6)',
        padding: '10px'
      }}>
        <h4 style={{color:'green'}}>Month { label }</h4>
        <p>{ formattedBalance }</p>
      </div>
    );
  }
}

export default CustomTooltip;
