import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import Select from 'react-select';
import AssetsPage from './components/AssetsPage';
import ShowOne from './components/ShowOne';
import HomePage from './components/HomePage';
import { 
  fetchAssets,
  updateAssetRank,
  fetchUser,
  fetchUserAssets,
  createUserAsset,
  destroyUserAsset,
  userLogin,
  userRegister,
} from './services/api';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // types: null,
      assets: null,
      selectedAsset: null,
      email: '',
      password:'',
      isLoggedIn: null,
      user: null,
      currentPage: '',
    };
    this.addUserAsset = this.addUserAsset.bind(this)
    this.deleteUserAsset = this.deleteUserAsset.bind(this)
    this.register = this.register.bind(this)
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getUserAssets = this.getUserAssets.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.filterAssets = this.filterAssets.bind(this)
  }

  componentDidMount() {
    this.getAssets();
    // this.getUsers();
  }

  getAssets() {
    fetchAssets()
      .then(assetData => this.setState({ assets: assetData.assets }));
  }

  async editAssetRank() {

  }

  async addUserAsset() {
    try {
      const { user, selectedAsset } = this.state;
      debugger;
      await createUserAsset(user.id, selectedAsset);
      debugger;
      const renderUserAssets = this.getUserAssets();
      return renderUserAssets;
    } catch (err) {
      throw (err);
    };
  }

  async deleteUserAsset(id) {
    try {
      const { user } = this.state;
      await destroyUserAsset(user.id, id);
      const renderUserAssets = this.getUserAssets();
      return renderUserAssets;
    } catch (err) {
      throw (err);
    };
  }

  async getUser() {
    try {
      const jwt = localStorage.getItem("jwt");
      const user = jwtDecode(jwt);
      const res = await fetchUser(jwt, user.sub);
      const state = this.setState({
        user: res,
      });
      return state;
    } catch (err) {
      throw (err);
    };
  }

  async getUserAssets() {
    try {
      const { user } = this.state;
      debugger;
      const assets = await fetchUserAssets(user.id);
      debugger;
      const state = this.setState({
        user: {
          assets: assets
        }
      });
      debugger;
      return state;
    } catch (err) {
      throw (err);
    };
  }

  
  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    });
    return res;
  }
  
  logout() {
    localStorage.removeItem("jwt")
    this.setState({
      isLoggedIn: false,
      user: null,
      email: "",
      password: "",
    });
  }
  
  async register() {
    try {
      const { email, password } = this.state;
      const user = await userRegister(email, password);
      return user;
    } catch (err) {
      throw (err);
    };
  }
  
  async login() {
    try {
      const { email, password } = this.state;
      const res = await userLogin(email, password);
      localStorage.setItem("jwt", res.jwt);
      this.setState({
        isLoggedIn: true,
        password: '',
      });
      const user = this.getUser();
      debugger;
      return user;
    } catch (err) {
      throw (err);
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  
  render() {
    
    const display = this.state.user && this.state.user.assets ? 
      this.state.user.assets.map((asset) => {
        return (
          <div key={asset.name}>
            <h1>{asset.name}</h1>
            <h2>Rank: {asset.rank}</h2>
            <span>
            {
              asset.blocks.reduce((total, block) => total + block.transaction_num, 0)
            }
            </span>
            <br/>
            <button onClick={() => this.deleteUserAsset(asset.id)}>Remove Asset</button>
          </div>
        )
      }) : 'WANT YOUR ASSETS?'

    const options = [
      { value: 'bitcoin', label: 'Bitcoin' },
      { value: 'ripple', label: 'Ripple' },
      { value: 'ethereum', label: 'Ethereum' },
      { value: 'stellar', label: 'Stellar' }
    ]

    return (
      <div className="App">
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            onChange={this.handleChange}
            value={this.state.value}
            type="password"
          />
          </form>
          <br />
          <button onClick={this.register}>Register</button>
          <button onClick={this.login}>Login</button>
          <button onClick={this.logout}>Logout</button>
          <br />
          <form onSubmit={this.addUserAsset}>
          <select
            value={this.state.selectedAsset}
            name="selectedAsset"
            onChange={this.handleChange} >
            <option value={this.state.selectedAsset} >Choose an Asset</option>
            {
              this.state.assets ?
              this.state.assets.map(asset => {
                return (
                  <option
                  key={asset.id}
                  value={asset.id}>
                    {asset.name}
                  </option>
                )
              }) : []
            }
          </select>
          <br />
          <input type='submit' value='Add Asset' />
          </form>
          {display}
        {/* <AssetsPage assets={this.state.assets} filterAssets={this.filterAssets} /> */}
        {/* <Select options={options} /> */}
        {/* <ShowOne assets={this.state.assets} /> */}
      </div>
    );
  }
}

export default App;
