import React from 'react';

function HomePage({ assets, searchedAsset, filterAsset, handleChange }) {
  return (
    <div>
      <h1>Test</h1>
      <input
      name="searchedAsset"
      type="text"
      placeholder={searchedAsset}
      value={searchedAsset}
      onChange={handleChange}
    />
    </div>
  )
}

export default HomePage
