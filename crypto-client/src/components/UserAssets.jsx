import React, { Component } from 'react';

class UserAssets extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addUserAsset();
  }

  render() {
    const display = this.props.user ? (
      this.props.user.assets.length ? (
        this.props.user.assets.sort(this.props.compareValues('transaction_total', 'asc')).map((asset) => {
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
        <form onSubmit={this.handleSubmit}>
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
