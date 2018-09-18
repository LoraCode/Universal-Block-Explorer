import React, { Component } from 'react';
import EditUserEmail from './EditUserEmail';

class LogRegForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showEdit: false
    }
    // this.isLoggedIn = this.isLoggedIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleShowEdit = this.toggleShowEdit.bind(this)
    this.clearInputs = this.clearInputs.bind(this)
    this.logoutAndClearFields = this.logoutAndClearFields.bind(this)
  }

  toggleShowEdit() {
    this.setState((prevState) => {
      prevState.showEdit = !prevState.showEdit;
      return prevState;
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  clearInputs() {
    this.setState({
      email: '',
      password: ''
    });
  }

  logoutAndClearFields() {
    this.props.logout();
    this.clearInputs();
  }

  render() {
    const { email, password } = this.state;
    let display;
    this.props.isLoggedIn ? display = (
      <div>
        {
          this.props.user ? <h1>User: {this.props.user.email}</h1> : <p>fetching email...</p>
        }
        {
          this.props.user ? (
            this.state.showEdit ? (
              <div>
                <EditUserEmail user={this.props.user}
                  handleChange={this.handleChange}
                  editUserEmail={this.props.editUserEmail}
                  toggleShowEdit={this.toggleShowEdit}
                />
                <button onClick={this.toggleShowEdit}>Cancel</button>
              </div>
            ) : <button onClick={this.toggleShowEdit}>Edit Email</button>
          ) : <p>no edit form</p>
        }
        <button onClick={this.logoutAndClearFields}>Logout</button>
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
