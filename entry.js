var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import AppLayout from './components/app_layout';
import Current from './components/current';
import Login from './components/log_in';
import App from './components/app';
import Backlog from './components/backlog';
import Popped from './components/popped';

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={Current} />
    <Route path='/login' component={ Login } />
    <Route path="Backlog" component={Backlog} />
    <Route path="Popped" component={Popped} />
</Router>, document.getElementById("placeholder"));
