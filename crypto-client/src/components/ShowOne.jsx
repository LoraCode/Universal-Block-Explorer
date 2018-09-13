import React from 'react';
import Block from './Block';

function ShowOne({ asset }) {
  let result;
  if (!asset) {
    result = (
      <p> wait for asset...</p>
    )
  } else {
    result = (
      <div>
        <h1>{asset.name}</h1>
        <h2>Asset Type: {asset.types[0].name}</h2>
        <h3>Transaction Total: {asset.transaction_total}</h3>
        {
         asset.blocks.map(block => (
           <div key={block.block_height}>
             <Block block={block} />
           </div>
         ))
        }
      </div>
    )
  }
  return (
    <div>
      {result}
    </div>
  )
}

export default ShowOne;
