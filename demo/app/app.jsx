// ensure cross browser javascript compatibitilty
import 'babel-polyfill';

// Import React and related libraries
import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/main';

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);