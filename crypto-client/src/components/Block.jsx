import React from 'react';

function Block({ block }) {
  return (
    <span>{block.transaction_num}</span>
  )
}

export default Block;
