// Page of information about me
import Autocomplete from 'react-google-autocomplete';
import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import './css/About.css';
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

	},
	// Render a <HomeItem> element
	render() {

		return (
	
				<div className='container'>
					<div id="problem">
						<h2> The Problem </h2>
						
						<p> It's become increasingly difficult to find new things to do around town when current search results are dominated by the top dogs. 
							Searching on places such as Google or Yelp will always return the same results.
							In Seattle, when searching for "top 10 things to do in Seattle" the results are flooded with tourist attractions such as the Space Needle, Pike Place Market, and the Seattle Art Museum.
							Of course these attractions are great but they can get old to people who have already done them.
							Meanwhile, there are many places in Seattle worth seeing and experiencing that are hard to find through usual search results.
						</p>
						<div className="row">
							<div className="col s4">
							  <div className="card medium">
								<div className="card-image">
								  <img src={require("../imgs/googleExample.png")}></img>
								  
								</div>
								<div className="card-content">
									<span className="card-title">Google Results</span>
								  <p>Here is an example of google results when searching for "things to do in Seattle". The top things to do are the tourist attractions that Seattle natives will find boring</p>
								</div>
							  </div>
							</div>
							<div className="col s4">
							  <div className="card medium">
								<div className="card-image">
								  <img src={require("../imgs/yelpExample.png")}></img>
								  
								</div>
								<div className="card-content">
								<span className="card-title">Yelp Results</span>
								  <p>Here is an example of google results when searching for "things to do in Seattle". The top things to do are the tourist attractions that Seattle natives will find boring</p>
								</div>
							  </div>
							</div>
							<div className="col s4">
							  <div className="card medium">
								<div className="card-image">
								  <img src={require("../imgs/tripadvisorExample.png")}></img>

								</div>
								<div className="card-content">
								  <span className="card-title">TripAdvisor Results</span>
								  <p>Here is an example of google results when searching for "things to do in Seattle". The top things to do are the tourist attractions that Seattle natives will find boring</p>
								</div>
							  </div>
							</div>
						</div>
					</div>
					
					<div id="solution">
						<h2> Our Solution </h2>
						
						<p> Our solution is to compile a list of all of the "hidden gems" in the Pacific Northwest. 
							Our database and presentation of our information will make it easy for our users to get past all the touristy attractions and find new things to do.
							Things such as "Paint the Town" in U-Village, Vance Creek Bridge in Shelton, and many others attractions will gain exposure.
							Our goal is to help the unknown but beautiful and fun attractions in the Pacific Northwest get the attention they deserve.
						</p>
						<div className="row">
							<div className="col s6">
							  <div className="card medium">
								<div className="card-image">
								  <img src={require("../imgs/mapExample.png")}></img>
								  
								</div>
								<div className="card-content">
									<span className="card-title">Google Results</span>
								  <p>One way we will present our information is through a map view. The map view allows users to quickly locate different hidden gems in the location they input.</p>
								</div>
							  </div>
							</div>
							<div className="col s6">
							  <div className="card medium">
								<div className="card-image">
								  <img src={require("../imgs/listExample.png")}></img>
								  
								</div>
								<div className="card-content">
								<span className="card-title">Yelp Results</span>
								  <p>Another form of information presentation is through a list view. The list view provides quickly accessible information about all of the hidden gems near our users.</p>
								</div>
							  </div>
							</div>
						</div>
					</div>
					
				</div>

		);
	}
});

export default HomePage;
