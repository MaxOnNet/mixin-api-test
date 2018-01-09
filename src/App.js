import React, { Component } from 'react';

import { AIMiningPoolGroupContainer, AIMiningWalletContainer} from './ComponentsAPI';

class App extends Component {
  render() {
    return (
        <center>
            <AIMiningPoolGroupContainer/>
            <br/>
            <AIMiningWalletContainer />
        </center>
    );
  }
}

export default App;
