import React, { Component } from 'react';

class NavButton extends Component {
    render() {
      return (
        <div>
          <button
          title="Go to About"
          onClick={() => this.props.navigator.navigate('AddAsset')}
          />
        </div>
      );
    }
  }
  export default NavButton;