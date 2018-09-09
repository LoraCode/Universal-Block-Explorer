import React from 'react';

function FilterButtons({ filterAssets }) {
  return (
    <div>
      <button value="Currency">Currency</button>
      <button>All</button>
      <button value="Platform">Platform</button>
    </div>
  )
}

export default FilterButtons;
