const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = 'http://localhost:3000'

const fetchAssets = async () => {
  try {
    const assets = await fetch(`${BASE_URL}/assets`);
    return assets.json();
  } catch (err) {
    throw (err);
  };
}

const updateAssetRank = async (id, rank) => {
  debugger;
  try {
    const url = `${BASE_URL}/assets/${id}`
    const body = {
      'asset': {
        'rank': rank
      }
    };
    const init = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(body),
    };
    const res = await fetch(url, init);
    debugger;
    return res.json();
  } catch (err) {
    throw (err);
  };
}

const fetchUser = async (jwt, id) => {
  try {
    const init = {
      headers: {'Authorization': `Bearer ${jwt}`}
    };
    const res = await fetch(`${BASE_URL}/users/${id}`, init);
    return res.json();
  } catch (err) {
    throw (err);
  };
}

const fetchUserAssets = async (id) => {
  try {
    const assets = await fetch(`${BASE_URL}/users/${id}/assets`)
    return assets.json();
  } catch (err) {
    throw (err);
  };
}

const createUserAsset = async (userId, assetId) => {
  try {
    const url = `${BASE_URL}/users/${userId}/assets`
    const body = {
      'asset': {
        'id': assetId
      }
    };
    const init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(body),
    };
    const res = await fetch(url, init);
    return res.json();
  } catch (err) {
    throw (err);
  };
}

const destroyUserAsset = async (userId, assetId) => {
  try {
    const url = `${BASE_URL}/users/${userId}/assets/${assetId}`
    const body = {
      'asset': {
        'id': assetId
      }
    };
    debugger;
    const init = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(body),
    };
    const res = await fetch(url, init);
    debugger;
    return res.json();
  } catch (err) {
    throw (err);
  };
}

const userRegister = async (email, password) => {
  try {
    const url = `${BASE_URL}/users`;
    const body = {
      'user': {
        'email': email,
        'password': password,
      }
    };
    const init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(body),
    };
    const res = await fetch(url, init);
    return res.json();
  } catch (err) {
    throw (err);
  };
}

const userLogin = async (email, password) => {
  try {
    const url = `${BASE_URL}/user_token` 
    const body = {
      'auth': {
        'email': email,
        'password': password,
      }
    };
    const init = { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(body),
    };
    const res = await fetch(url, init);
    return res.json();
  } catch (err) {
    throw (err);
  };
}

export {
  fetchAssets,
  updateAssetRank,
  fetchUser,
  fetchUserAssets,
  createUserAsset,
  destroyUserAsset,
  userRegister,
  userLogin
};
