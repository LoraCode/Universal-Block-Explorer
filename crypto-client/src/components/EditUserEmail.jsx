import React, { Component } from 'react';

class EditUserEmail extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      id: user.id,
      email: user.email
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { id, email } = this.state;
    this.props.editUserEmail(id, email);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  render() {
    const { email } = this.state;
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name='email'
            value={email}
            onChange={this.handleChange}
          />
          <input type='submit' value='Update Email'/>
        </form>
      </div>
    );
  }
}

export default EditUserEmail;
