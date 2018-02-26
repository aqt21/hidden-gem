// Page of information about me
import React from 'react';
import $ from 'jquery';
import HomeItem from './HomeItem';
import AboutUsItem from './AboutUsItem';
import './css/Home.css';
import firebase from 'firebase';

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
				<AboutUsItem info={this.state.aboutUs.aboutUs}/>
				<HomeItem key={'img1'} img={'imgs/bread.jpg'} page={'View Our Blog'} link={'/blog'} text={"Our blog is continually updated with the delicious bread-related posts!"}/>
				<HomeItem key={'img2'} img={'imgs/bread2.jpg'} page={'Browse the Store'} link={'/store'} text={'Would you like to purchase some nutritional and healthy breads for you and your family?'}/>
			</div>
		);
	}
});

export default HomePage;
