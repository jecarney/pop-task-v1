import React, { Component } from 'react';

import App from './app';
import CurrentInner from './current_inner';

class Current extends Component {

  render() {
    return (
      <App>
        <CurrentInner />
      </App>
    );
  }
}

export default Current;
