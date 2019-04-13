import React from "react";
import './ListOfAssets.css';

class ListOfAssets extends React.Component {
  state = { stackId: null };

  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.setValue(e.target.value);
    }
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Asset;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods["set"].cacheSend(value, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };

  render() {
    var data = {
    columns: ['Blood Group', 'Organization', 'City', 'Units Available'],
    rows: [{
        'Blood Group': 'O+',
        'Organization': 'Aga Khan University Hospital',
        'City': 'Karachi',
        'Units Available': 65
      }, {
        'Blood Group': 'O-',
        'Organization': 'National Institute Of Medical Centre',
        'City': 'Lahore',
        'Units Available': 12
      }, {
        'Blood Group': 'AB+',
        'Organization': 'Shaukat Khanum Hospital',
        'City': 'Peshawar',
        'Units Available': 2
      }, {
        'Blood Group': 'A+',
        'Organization': 'Aga Khan University Hospital',
        'City': 'Karachi',
        'Units Available': 12
      }, {
        'Blood Group': 'O+',
        'Organization': 'National Blood Bank',
        'City': 'Karachi',
        'Units Available': 10
      }, {
        'Blood Group': 'B-',
        'Organization': 'National Institute Of Medical Centre',
        'City': 'Lahore',
        'Units Available': 12
      }, {
        'Blood Group': 'AB-',
        'Organization': 'Shaukat Khanum Hospital',
        'City': 'Peshawar',
        'Units Available': 26
      }, {
        'Blood Group': 'O+',
        'Organization': 'Fatmid Foundation',
        'City': 'Karachi',
        'Units Available': 128
      }, {
        'Blood Group': 'O+',
        'Organization': 'Edhi Donation Centre',
        'City': 'Gilgit',
        'Units Available': 34
      }]
    };
    var dataColumns = data.columns;
    var dataRows = data.rows;
    var tableHeaders = (
    <thead>
        <tr>
          {dataColumns.map(function(column) {
            return <th>{column}</th>; })}
            <th></th>
        </tr>
    </thead>);

    var tableBody = dataRows.map(function(row) {
    return (
      <tbody>
      <tr>
        {dataColumns.map(function(column) {
          return <td>{row[column]}</td>})}
        <td><button type="button">Request</button></td>
      </tr>
      </tbody>
      ); });

    return (
      <div>
      <hr/>
      <table className="ListOfAssets">
         {tableHeaders}
        {tableBody} 
       </table>
        <div>{this.getTxStatus()}</div>
        </div>
    );
  }
}

export default ListOfAssets;