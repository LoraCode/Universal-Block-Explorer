import React from 'react';

function Asset({ asset }) {
  return (
    <div key={asset.id}>
      <h1>{asset.name}</h1>
    </div>
  )
}

export default Asset;
