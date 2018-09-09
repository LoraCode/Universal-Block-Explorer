import React from 'react';

function Block({ block }) {
  return (
    <div>
      <h1>Block Height: {block.block_height}</h1>
      <h2>Block Hash: {block.block_hash}</h2>
      <h3>Number of Transactions: {block.transaction_num}</h3>
    </div>
  )
}

export default Block;
