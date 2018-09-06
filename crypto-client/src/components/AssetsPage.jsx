import React from 'react';
import AssetList from './AssetList';

function AssetsPage({ assets }) {
  return (
    <div>
      <h2>All Assets</h2>
      <AssetList assets={assets} />
    </div>
  );
}
  export default AssetsPage;
