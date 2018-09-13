import React from 'react';
import Asset from './Asset';

function compareValues(transaction_total, order='asc') {
  return function(asset1, asset2) {
    if(!asset1.hasOwnProperty(transaction_total) || !asset2.hasOwnProperty(transaction_total)) {
      // property doesn't exist on either object
        return 0; 
    }

    const assetA = (typeof asset1[transaction_total] === Number) ? 
      asset1[transaction_total] : asset1[transaction_total];
    const assetB = (typeof asset2[transaction_total] === Number) ? 
      asset2[transaction_total] : asset2[transaction_total];

    let evaluation = 0;

    if (assetA < assetB) {
      evaluation = 1;
    } else if (assetA > assetB) {
      evaluation = -1;
    }
    return (
      (order == 'desc') ? (evaluation * -1) : evaluation
    );
  };
}

function AssetList({ assets, showTargetAsset }) {
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
          assets.sort(compareValues('transaction_total', 'asc')).map((asset, index) => (
            <div name='showOne' key={asset.id}>
              <h1>Rank:{index + 1}</h1>
              <Asset asset={asset} showTargetAsset={showTargetAsset} index={index} />
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
