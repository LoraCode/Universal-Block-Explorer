import React from 'react';
import Block from './Block';

function ShowOne({ assets }) {
  let result;
  if (!assets) {
    result = (
      <p> wait for asset...</p>
    )
  } else {
    result = (
      <div>
        <h1>{assets[0].name}</h1>
        <h2>{assets[0].types[0].name}</h2>
        {
         assets[0].blocks.map(block => (
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
