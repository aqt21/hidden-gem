// Page of information about me
import React from 'react';
import $ from 'jquery';
import './css/Profile.css';
import firebase from 'firebase';

// ProfilePage Component
var ProfilePage = React.createClass({
	getInitialState(){
		return {aboutUs:""};
	},

	// When component mounts, get the data and set the state of 'homeItem'
	componentDidMount(){
		this.profilePageRef = firebase.database().ref('profilePage');
		//get data from Firebase
		
		this.profilePageRef.on('value', (snapshot) => {
			if(snapshot.val()){
				this.setState({aboutUs:snapshot.val()});
			}
		});

		console.log(this.state.aboutUs);
		
		$('#profile').animate({opacity: '1'}, "slow");
	},
	
	// Render a <HomeItem> element
	render() {

		return (
			<div className='newbackground'>
			<div className='container' id='profile'>
				<div id='profile-header'>
				<div id='name'> Name </div>
				</div>
				<div id='favorites'> Favorite Gems </div>
				<div id='saved'> Saved Gems </div>
				
			</div>
			</div>
		);
	}
});

export default ProfilePage;
