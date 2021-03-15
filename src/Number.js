import React from 'react';

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};


function Number(props) {
  const { number, onClick, status } = props;

  return (
    <button
      key={number}
      className='number'
      onClick={() => onClick(number, status)}
      style={{ backgroundColor: colors[status] }}
    >
      {number}
    </button>
  );
}

export default Number;
