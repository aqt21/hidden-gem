// Application
import React from 'react';
import './css/App.css';
import { Link } from 'react-router';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/materialize-css/css/ghpages-materialize.css';
import firebase from 'firebase';
import FirebaseConfig from './Config';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import SignOut from './SignOut';
import Materialize from "materialize-css";

var App = React.createClass({
	getInitialState(){
		return{checked:false, user:null, authOption:'sign-in'}
	},
	
	componentWillMount(){
		firebase.initializeApp(FirebaseConfig);
		
		firebase.auth().onAuthStateChanged((user) => {
			if(this.state.checked !== true){
				if(user){
					this.setState({user:user});
				}
			}

			//Indicate that state has been checked
			this.setState({checked:true})
		});
		
	},

	signOut(){
		firebase.auth().signOut().then(() => {
			this.setState({user:null});
		});
	},
	
	render() {
		const childrenWithProps = React.Children.map(this.props.children, 
			(child) => React.cloneElement(child, {
				user: this.state.user
			}));

		// Return links and show anything inside the <App> component (children)
		return (
		
				<div className='App'>
					
					<div id='nav'>
						<ul id="dropdown1" className="dropdown-content">
							{this.state.user &&
							<li><Link className='link' activeClassName='active' to='/profile'>Profile</Link></li>
							}
							{this.state.user &&
							<li><SignOut submit={this.signOut} /></li>
							}
							{!this.state.user &&
							<li><Link className='link' activeClassName='active' to='/sign-in'>Sign In</Link></li>
							}
							{!this.state.user &&
							<li><Link className='link' activeClassName='active' to='/sign-up'>Sign Up</Link></li>
							}

						</ul>
						<nav>
						  <div className="nav-wrapper">
							<a href="#!" className="brand-logo">Logo</a>
							<ul className="right hide-on-med-and-down">
							  <li><Link className='link' activeClassName='active' to='/home'>Home</Link></li>
							  <li><Link className='link' activeClassName='active' to='/map'>Map</Link></li>
							  <li><Link className='link' activeClassName='active' to='/list'>List</Link></li>
							  <li><a className="dropdown-button" href="#!" data-activates="dropdown1"><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i></a></li>
							</ul>
						  </div>
						</nav>
				
					</div>


					<div className='children'>
						{childrenWithProps}
					</div>

					
				</div>
		);
	}
});

export default App;