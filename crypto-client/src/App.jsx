import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import Select from 'react-select';
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
      // email: '',
      // password:'',
      isLoggedIn: null,
      user: null,
      currentPage: 'home',
    };
    // this.editAssetRank = this.editAssetRank.bind(this)
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
    // this.filterAssets = this.filterAssets.bind(this)
  }

  componentDidMount() {
    this.getAssets();
    // this.state.user ? (
    // this.getUserAssets()
    // ) : null
    // this.isLoggedIn();
    // this.orderByTransactionTotal(this.getAssets());
  }

  async showMeAssetsPlease() {
    try {
      const assets = await this.getAssets();
      const soretedState = this.orderByTransactionTotal(assets)
      return soretedState;
    } catch (err) {
      throw (err);
    };
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

  // async orderByTransactionTotal(assets) {
  //   try {
  //     const sortedAssets = assets.sort(this.compareValues('transaction_total', 'desc'))
  //     const state = this.setState({ assets: sortedAssets });
  //     return state;
  //   } catch (err) {
  //     throw (err);
  //   };
  // }

  // async orderById(assetsArr) {
  //   try {
  //     const sorted = assetsArr.sort(this.compareValues('id', 'desc'));
  //     debugger;
  //     const state = this.setState({ orderById: sorted });
  //     debugger;
  //     return state;
  //   } catch (err) {
  //     throw (err);
  //   };
  // }

  // async orderByRank(assetsArr) {
  //   try {
  //     const sorted = assetsArr.sort(this.compareValues('rank', 'desc'));
  //     debugger;
  //     const state = this.setState({ orderByRankAssets: sorted });
  //     debugger;
  //     return state;
  //   } catch (err) {
  //     throw (err);
  //   };
  // }

  // compare(beforeId, afterId) {
  //   let comparison = 0;
  //   if (beforeId.rank < afterId.rank) {
  //     comparison = 1;
  //   } else if (afterId.rank < beforeId.rank) {
  //     comparison = -1;
  //   }
  //   return comparison;
  // }


  // totalArray(arr) {
  //   debugger;
  //   debugger;
  //   const txSumArr = arr.map(a => a.blocks.reduce((t, block) => t + block.transaction_num, 0));
  //   debugger;
  //   console.log(txSumArr);
  //   return txSumArr
  // }

  // async editAssetRank() {
  //   try {
  //     const { assets } = this.state; // want the state that's ordered by ID
  //     const arr = this.totalArray(assets);
  //     const length = arr.length;
  //     debugger;
  //     let max;
  //     let index;
  //     let rank = 0;
  //     for(let i = 0; i <= length; i += 1) {
  //       debugger;
  //       max = Math.max(...arr);
  //       debugger;
  //       index = arr.indexOf(max) + 1;
  //       debugger;
  //       rank += 1;
  //       debugger;
  //       updateAssetRank(index, rank);
  //       debugger;
  //       if (index - 1 > -1) {
  //         arr.splice(index - 1, 1);
  //       }
  //     }
  //     return arr
  //   } catch (err) {
  //     throw (err);
  //   };
  // }

  async addUserAsset(evt) {
    evt.preventDefault();
    try {
      const { user, selectedAsset } = this.state;
      debugger;
      await createUserAsset(user.id, selectedAsset);
      debugger;
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

  async getUserAssets() {
    try {
      const { user } = this.state;
      debugger;
      const assets = await fetchUserAssets(user.id);
      debugger;
      const yay = this.setState((prevState) => {
        debugger;
        return prevState.user.assets;
      });
      debugger;
      return yay;
    } catch (err) {
      throw (err);
    };
  }

  async isLoggedIn() {
    let res;
    localStorage.getItem("jwt") ? res === true : res === false
    this.setState({
      isLoggedIn: res,
    });
    return await this.getUser();
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

    const options = [
      { value: 'bitcoin', label: 'Bitcoin' },
      { value: 'ripple', label: 'Ripple' },
      { value: 'ethereum', label: 'Ethereum' },
      { value: 'stellar', label: 'Stellar' }
    ]

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
        {/* <Select options={options} /> */}
      </div>
    );
  }
}

export default App;
