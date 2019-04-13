import React, { Component } from 'react';
import BloodTracking from "./BloodTracking";
import ListOfAssets from "./ListOfAssets";
import MainPage from "./MainPage"; 
import './App.css';

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    console.log('inside app')
    console.log(this)
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        {/* <BloodTracking
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        /> */}
        {/* <MainPage
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          //navigation={this.props.navigation}
        /> */}
        <MainPage
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          //navigation={this.props.navigatior}
        />
        <ListOfAssets
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          //navigation={this.props.navigatior}
        />
      </div> 
    );
  }
}

export default App;
