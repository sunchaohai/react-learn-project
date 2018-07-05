import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/pc.css'
import './css/mobile.css'
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.less'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
