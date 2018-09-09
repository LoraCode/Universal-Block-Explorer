import React from 'react';
import Block from './Block';

function Asset({ asset }) {
  return (
    <div>
      <h2>Rank:{asset.rank}</h2>
      <h1>{asset.name}</h1>
      <span>
      {
        // asset.blocks.map(block => (
        //   <div key={block.block_height}>
        //     <Block block={block} />
        //   </div>
        // ))
        asset.blocks.reduce((total, block) => total + block.transaction_num, 0)
      }
      </span>
    </div>
  )
}

export default Asset;
