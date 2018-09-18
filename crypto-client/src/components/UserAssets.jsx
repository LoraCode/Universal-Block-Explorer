import React, { Component } from 'react';

class UserAssets extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectedAsset: null,
    // }
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]:e.target.value
  //   });
  // }

  render() {
    const display = this.props.user ? (
      this.props.user.assets.length ? (
        this.props.user.assets.sort(this.props.compareValues('id', 'desc')).map((asset) => {
          return (
            <div key={asset.name}>
              <h1>{asset.name}</h1>
              <span>
                {
                  asset.blocks.reduce((total, block) => total + block.transaction_num, 0)
                }
              </span>
              <br />
              <button onClick={() => this.props.deleteUserAsset(asset.id)}>Remove Asset</button>
            </div>
          )
        })
      ) : []
    ) : 'WANT YOUR ASSETS?'
    return (
      <div>
        <form onSubmit={(evt) => this.props.addUserAsset(evt)}>
          <select
            name="selectedAsset"
            onChange={this.props.handleChange} >
            <option >Choose an Asset</option>
            {
              this.props.assets ?
                this.props.assets.sort(this.props.compareValues('id', 'desc')).map(asset => {
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
      </div>
    );
  }
}

export default UserAssets;
