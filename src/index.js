import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import './css/index.css';
import HomePage from './HomePage';
import MapPage from './MapPage';
import ListPage from './ListPage';

// Render DOM
ReactDOM.render(
        <Router history={hashHistory}>
            <Route path='/' component={App}>
				<IndexRoute component={HomePage}/>
                <Route path='home' component={HomePage}/>
                <Route path='map' component={MapPage}/>
				<Route path='list' component={ListPage}/>
            </Route>
        </Router>,
  document.getElementById('root')
);
