const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

async function fetchAssets() {
  try {
    const assets = await fetch(`${BASE_URL}/assets`);
    return assets.json();
  } catch (err) {
    throw (err);
  };
}

async function fetchUser(jwt, id) {
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

async function userRegister(email, password) {
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

async function userLogin(email, password) {
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
  userLogin,
  userRegister,
  fetchUser
};
