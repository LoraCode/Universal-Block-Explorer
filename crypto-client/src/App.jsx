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
    };
  }

    componentDidMount() {
      this.getTypes();
      this.getAssets();
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
    return (
      <div className="App">
        <AssetsPage assets={this.state.assets}/>
      </div>
    );
  }
}

export default App;
