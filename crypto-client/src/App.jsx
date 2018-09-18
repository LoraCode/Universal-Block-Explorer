import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import AssetsPage from './components/AssetsPage';
import ShowOne from './components/ShowOne';
import HomePage from './components/HomePage';
import UserAssets from './components/UserAssets';
import LogRegForm from './components/LogRegForm';
import { 
  fetchAssets,
  fetchUser,
  fetchUserAssets,
  createUserAsset,
  destroyUserAsset,
  userLogin,
  userRegister,
  updateUserEmail,
} from './services/api';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // types: null,
      assets: null,
      selectedAsset: null,
      targetAsset: null,
      isLoggedIn: null,
      user: null,
      currentPage: 'home',
    };
    this.addUserAsset = this.addUserAsset.bind(this)
    this.deleteUserAsset = this.deleteUserAsset.bind(this)
    this.editUserEmail = this.editUserEmail.bind(this)
    this.register = this.register.bind(this)
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getUserAssets = this.getUserAssets.bind(this)
    this.showTargetAsset = this.showTargetAsset.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.getAssets();
  }

  getAssets() {
    fetchAssets()
      .then(assetsData => this.setState({ assets: assetsData.assets }));
  }

  showTargetAsset(evt) {
    const { assets } = this.state;
    const assetIndex = parseInt(evt.target.parentElement.id);
    const asset = assets[assetIndex];
    this.setState((prevState) => {
      prevState.targetAsset = asset;
      prevState.currentPage = 'showOne';
      return prevState;
    });
  }

  compareValues(key, order='asc') {
    return function(asset1, asset2) {
      if(!asset1.hasOwnProperty(key) || !asset2.hasOwnProperty(key)) {
        // property doesn't exist on either object
          return 0; 
      }
  
      const assetA = (typeof asset1[key] === Number) ? 
        asset1[key] : asset1[key];
      const assetB = (typeof asset2[key] === Number) ? 
        asset2[key] : asset2[key];
  
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
  
  async getUser() {
    try {
      const jwt = localStorage.getItem("jwt");
      const user = jwtDecode(jwt);
      const res = await fetchUser(jwt, user.sub);
      delete res.password_digest;
      const state = this.setState({
        user: res,
      });
      return state;
    } catch (err) {
      throw (err);
    };
  }

  async addUserAsset() {
    try {
      const { user, selectedAsset } = this.state;
      await createUserAsset(user.id, selectedAsset);
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

  async getUserAssets() {
    try {
      const { user } = this.state;
      debugger;
      const newAssets = await fetchUserAssets(user.id);
      debugger;
      const updatedUserAssets = this.setState({
        user: {
          assets: newAssets
        }
      });
      debugger;
      return updatedUserAssets;
    } catch (err) {
      throw (err);
    };
  }
  
  async editUserEmail(id, email) {
    try {
      const updatedUser = await updateUserEmail(id, email);
      const state = this.setState({
        user: {
          email: updatedUser.email
        }
      });
      return state;
    } catch (err) {
      throw (err);
    }
  }
  
  async register(email, password) {
    try {
      await userRegister(email, password);
      const userLogged = await this.login(email, password);
      return userLogged;
    } catch (err) {
      throw (err);
    };
  }
  
  async login(email, password) {
    try {
      const res = await userLogin(email, password);
      localStorage.setItem("jwt", res.jwt);
      this.setState({
        isLoggedIn: true,
        password: '',
      });
      const user = this.getUser();
      return user;
    } catch (err) {
      throw (err);
    };
  }
  
  isLoggedIn() {
    let res;
    localStorage.getItem("jwt") ? res === true : res === false
    this.setState({
      isLoggedIn: res,
    });
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

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  toggleCurrentPage(evt) {
    const name = evt.target.name;
    this.setState((prevState) => {
      prevState.currentPage = name;
      return prevState;
    });
  }

  choosePage() {
    const { currentPage } = this.state;
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'assets':
        return <AssetsPage assets={this.state.assets} 
        showOne={this.toggleCurrentPage}
        showTargetAsset={this.showTargetAsset}
        />
      case 'myAssets':
        return <UserAssets user={this.state.user} 
        compareValues={this.compareValues}
        showTargetAsset={this.showTargetAsset}
        addUserAsset={this.addUserAsset}
        deleteUserAsset={this.deleteUserAsset}
        assets={this.state.assets}
        handleChange={this.handleChange}
        />
      case 'showOne':
        return <ShowOne assets={this.state.assets}
        asset={this.state.targetAsset} />

    }
  }
  
  render() {

    return (
      <div className="App">
        <header>
        <LogRegForm
          register={this.register}
          login={this.login}
          logout={this.logout}
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user}
          editUserEmail={this.editUserEmail}
        />
        <button name='home' onClick={(evt) => this.toggleCurrentPage(evt)}>Home</button>
        <button name='assets' onClick={(evt) => this.toggleCurrentPage(evt)}>Assets</button>
        {
          this.state.user ? (
          <button name='myAssets' onClick={(evt) => this.toggleCurrentPage(evt)}>My Assets</button>
          ) : (
          <div></div>
          )
        }
        </header>
        {this.choosePage()}
      </div>
    );
  }
}

export default App;
