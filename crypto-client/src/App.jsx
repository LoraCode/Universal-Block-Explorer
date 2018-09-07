import React, { Component } from 'react';
import './App.css';
import AssetsPage from './components/AssetsPage'
import { fetchTypes, fetchAssets } from './services/api'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: null,
      assets: null,
      email: '',
      password:'',
      isLoggedIn: null,
      users: [],
    };
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }

  getUsers() {
    const jwt = localStorage.getItem("jwt")
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

  login() {
    const url = `http://localhost:3000/user_token`;
    const body = {"auth": {"email": this.state.email, "password": this.state.password} }
    const init = { method: 'POST',
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

    // const display = this.state.isLoggedIn ? this.state.users.map((user) => {
    //   return <p key={user.id}> Email:{user.email} </p>
    // }) : "UNAUTHORIZED"

    return (
      <div className="App">
        {/* <form>
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
          <button onClick={this.login}>Login</button>
          <button onClick={this.logout}>Logout</button>
          {display} */}
        <AssetsPage assets={this.state.assets}/>
      </div>
    );
  }
}

export default App;
