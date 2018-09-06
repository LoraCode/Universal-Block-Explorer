import React from 'react';
import Asset from './Asset';

function AssetList({ assets }) {
  let results;
  if (!assets) {
    results = (
      <p>
        Fetching Assets...
      </p>
    );
  } else {
    results = (
      assets.length ? (
        <div>
        {
          assets.map(asset => (
            <div>
              <Asset asset={asset} />
            </div>
          ))
        }
        </div>
      ) : (
        <p>
          Something went wrong...
        </p>
      )
    )
  }
  return (
    <div>
      {results}
    </div>
  );
}

export default AssetList;
