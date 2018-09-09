import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import Select from 'react-select';
import AssetsPage from './components/AssetsPage';
import ShowOne from './components/ShowOne';
import HomePage from './components/HomePage';
import { fetchTypes, fetchAssets } from './services/api';


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
      users: [],
      currentPage: '',
    };
    this.register = this.register.bind(this)
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.filterAssets = this.filterAssets.bind(this)
  }

  // filterAssets(e) {
  //   const assets = this.state.assets.filter((asset) => {
  //     if (e.target.value === asset.types[0].name) {
  //       return asset;
  //     } else {
  //       assets.pop(asset);
  //     }
  //   });
  //   return assets;
  // }

  getUsers() {
    const jwt = localStorage.getItem("jwt")
    debugger;
    const init = { 
      headers: {"Authorization": `Bearer ${jwt}`}
    }
    fetch(`http://localhost:3000/users`, init)
    .then(res => res.json())
    .then(data => this.setState({
      users: data,
    }))
    .catch(err => err)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  isLoggedIn() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      isLoggedIn: res,
    })
    return res;
  }

  logout() {
    localStorage.removeItem("jwt")
    this.setState({
     isLoggedIn: false,
     users: [],
     name:"",
     email:"",
    })
  }

  register() {
    const url = `http://localhost:3000/users`;
    const body = {"user": {"email": this.state.email, "password": this.state.password} }
    const init = { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body:JSON.stringify(body),
    }
    fetch(url, init)
    .then(res => res.json())
    .catch(err => console.log(err))
  }

  login() {
    const url = `http://localhost:3000/user_token`;
    const body = {"auth": {"email": this.state.email, "password": this.state.password} }
    const init = { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      mode: 'cors',
      body:JSON.stringify(body),
    }
    fetch(url, init)
    .then(res => res.json())
    .then(res => localStorage.setItem("jwt", res.jwt))
    .then(() => this.setState({
      isLoggedIn: true,
    }))
    .then(() => this.getUsers())
    .catch(err => console.log(err))
  }

    componentDidMount() {
      this.getTypes();
      this.getAssets();
      // this.getUsers();
    }

    getTypes() {
      fetchTypes()
        .then(typeData => this.setState({ types: typeData.types }));
    }

    getAssets() {
      fetchAssets()
        .then(assetData => this.setState({ assets: assetData.assets }));
    }

  render() {

    const display = this.state.isLoggedIn ? this.state.users.map((user) => {
      return <p key={user.id}> Email:{user.email} </p>
    }) : "UNAUTHORIZED"

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
          {display}
        {/* <AssetsPage assets={this.state.assets} filterAssets={this.filterAssets} /> */}
        {/* <Select options={options} /> */}
        {/* <ShowOne assets={this.state.assets} /> */}
      </div>
    );
  }
}

export default App;
