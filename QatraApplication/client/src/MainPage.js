import React, { Component } from 'react';
import AddAsset from "./AddAsset";
import ListOfAssets from "./ListOfAssets";
import logoapp from "./images/logoapp.png"

class MainPage extends Component {
  state = { redirect: false };
  // constructor(props) {
  //   super(props);
  //   //this.buttonPress = this.buttonPress.bind(this);
  // }

  // buttonPress = () => {
  //   console.log('AddAsset called');
  //   console.log(this);
  //   this.setState({ redirect: true });
  //   this.props.navigaton('AddAsset')
  // }

  render() {
    return (
      <div>
        {/* <button onClick={this.buttonPress}>Add Asset</button> */}
        <img src={logoapp} alt="logo"/>
      </div>
    );
  }
}

export default MainPage;