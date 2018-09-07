import React from 'react';
import Block from './Block';

function doSomething(arr) {
  const result = arr.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return (
    <div>
    {result}
    </div>
  )
}

function Asset({ asset }) {
  return (
    <div>
      <h1>{asset.name}</h1>
      <span>
      {
        asset.blocks.reduce((total, block) => total + block.transaction_num, 0)
      }
      </span>
    </div>
  )
}

export default Asset;
