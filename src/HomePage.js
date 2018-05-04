// Page of information about me
import Autocomplete from 'react-google-autocomplete';
import React from 'react';
import { Link } from 'react-router';
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
		
		$('#home').animate({opacity: '1'});
		 $('.chips').material_chip();
		  $('.chips-autocomplete').material_chip({
			autocompleteOptions: {
			  data: {
				'Waterfall': null,
				'Restaurant': null,
				'Art': null,
				'Outdoors': null,
				'Indoors': null,
				'24 hours': null,
				'Family': null
			  },
			  limit: Infinity,
			  minLength: 1
			}
		  });

	},
	
	createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else {
			var expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	}, 
	// Render a <HomeItem> element
	render() {

		return (
			<div id='home_background'>
				
				<div className='container' id='home'>
					<h1 id="homeHeader"> Hidden <img id="homeIcon" src={require("../imgs/gemicon-w.png")}></img> Gem </h1>
					<p id="homeDescription"> Discover your backyard </p>
					
					<form>
						<div className="input-field">
						  <Autocomplete
								style={{width: '90%'}}
								onPlaceSelected={(place) => {
									console.log(place);
								  this.createCookie("lat", place.geometry.location.lat());
								  this.createCookie("lng", place.geometry.location.lng());
								  console.log(place.geometry.location.lat());
								  console.log(place.geometry.location.lng());
								  console.log(document.cookie);
								}}
								types={['address']}
								componentRestrictions={{country: "usa"}}
							/>
						</div>
						<div id="homeWrapper">
							<a className="waves-effect waves-light btn" id="homeBtn" ><Link className='link' activeClassName='active' to='map'>Find your Hidden Gems</Link></a>
						</div>
					</form>
					
				</div>
			</div>
		);
	}
});

export default HomePage;
