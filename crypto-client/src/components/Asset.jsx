import React from 'react';
import Block from './Block';

function Asset({ asset }) {
  return (
    <div>
      <h1>{asset.name}</h1>
      <div>
      {
        asset.blocks.map(block => (
          <div key={block.block_height}>
            <Block block={block} />
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Asset;
