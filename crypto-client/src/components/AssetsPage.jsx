import React from 'react';
import AssetList from './AssetList';
import FilterButtons from './FilterButtons'

function AssetsPage({ assets, filterAssets }) {
  return (
    <div>
      <h2>Assets</h2>
      <FilterButtons filterAssets={filterAssets} />
      <AssetList assets={assets} />
    </div>
  );
}

export default AssetsPage;
