// Page of information about me
import React from 'react';
import $ from 'jquery';
import './css/Home.css';
import firebase from 'firebase';
import Materialize from "materialize-css";


// HomePage Component
var HomePage = React.createClass({
	getInitialState(){
		return {aboutUs:""};
	},

	// When component mounts, get the data and set the state of 'homeItem'
	componentDidMount(){
		this.homePageRef = firebase.database().ref('homePage');
		//get data from Firebase
		
		this.homePageRef.on('value', (snapshot) => {
			if(snapshot.val()){
				this.setState({aboutUs:snapshot.val()});
			}
		});

		console.log(this.state.aboutUs);
		
		$('#home').animate({opacity: '1'}, "slow");
		
	},
	
	// Render a <HomeItem> element
	render() {

		return (
			<div className='container' id='home'>
				  <form>
					<div className="input-field">
					  <input id="search" type="search" required />
					  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
					  <i className="material-icons">close</i>
					</div>
				  </form>
			</div>
		);
	}
});

export default HomePage;
