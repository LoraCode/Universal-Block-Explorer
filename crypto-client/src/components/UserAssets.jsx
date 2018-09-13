import React, { Component } from 'react';

class UserAssets extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    debugger
  const display = this.props.user ? 
      this.props.user.assets.sort(this.props.compareValues('id', 'desc')).map((asset) => {
        return (
          <div key={asset.name}>
            <h1>{asset.name}</h1>
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
      return display;
    }
}

export default UserAssets;
