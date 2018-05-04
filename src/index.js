import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import './css/index.css';
import HomePage from './HomePage';
import MapPage from './MapPage';
import ListPage from './ListPage';
import ModPage from './ModPage';
import ProfilePage from './ProfilePage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import AboutPage from './AboutPage';

// Render DOM
ReactDOM.render(
        <Router history={hashHistory}>
            <Route path='/' component={App}>
				<IndexRoute component={HomePage}/>
                <Route path='home' component={HomePage}/>
                <Route path='map' component={MapPage}/>
				<Route path='list' component={ListPage}/>
				<Route path='profile' component={ProfilePage}/>
				<Route path='sign-up' component={SignUpPage}/>
				<Route path='sign-in' component={SignInPage}/>
				<Route path='mod' component={ModPage}/>
				<Route path='about-us' component={AboutPage}/>
            </Route>
        </Router>,
  document.getElementById('root')
);
