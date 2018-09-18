import React, { Component } from 'react';

class LogRegForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    // this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  render() {
    const { email, password } = this.state;
    let display;
    this.props.isLoggedIn ? display = (
      <div>
        {
          this.props.user ? <h1>User: {this.props.user.email}</h1> : <p>lol</p>
        }
        <button onClick={this.props.logout}>Logout</button>
      </div>
    ) : display = (
      <div>
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
            value={this.state.password}
            type="password"
          />
        </form>
        <br />
        <button onClick={() => this.props.register(email, password)}>Register</button>
        <button onClick={() => this.props.login(email, password)}>Login</button>
      </div>
    )
    return display;
     }
  }

export default LogRegForm;
