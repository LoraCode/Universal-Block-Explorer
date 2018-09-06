const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

async function fetchTypes() {
  try {
    const types = await fetch(`${BASE_URL}/types`)
    return types.json();
  } catch (err) {
    throw (err);
  }
}

async function fetchAssets() {
  try {
    const assets = await fetch(`${BASE_URL}/assets`)
    return assets.json();
  } catch (err) {
    throw (err);
  }
}

export {
  fetchTypes,
  fetchAssets
}