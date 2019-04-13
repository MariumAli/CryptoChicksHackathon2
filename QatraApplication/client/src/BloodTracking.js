import React from "react";

class BloodTracking extends React.Component {
    state = { dataKey: null };

    componentDidMount() {
      const { drizzle } = this.props;
      const contract = drizzle.contracts.Asset;
  
      // let drizzle know we want to watch the `myString` method
      const dataKey = contract.methods["myString"].cacheCall();
  
      // save the `dataKey` to local component state for later reference
      this.setState({ dataKey });
    }
  
    render() {
      // get the contract state from drizzleState
      const { Asset } = this.props.drizzleState.contracts;
  
      // using the saved `dataKey`, get the variable we're interested in
      const asset = Asset.myString[this.state.dataKey];
  
      // if it exists, then we display its value
      return <p>My stored string: {asset && asset.value}</p>;
    }
  }

export default BloodTracking;