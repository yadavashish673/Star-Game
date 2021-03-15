import React from 'react';
import { utils } from './utils/util';

function Star({ count }) {
  return (
    <>
      {utils.range(1, count).map((starId) => (<div key={starId} className='star'></div>))}
    </>
  );
}

export default Star;
