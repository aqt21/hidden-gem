// Page of blogs to show
/* global google */
import React from 'react';
import './css/Map.css';
import firebase from 'firebase';
import $ from 'jquery';
import MapItem from './MapItem';
import ListItem from './ListItem';
import PostBox from './PostBox';
import FirebaseConfig from './Config';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";




// MapPage Component
var MapPage = React.createClass({
	getInitialState(){
		return{mapItems:[], fileName:"", isUploading:false, uploadPicUrl:""}
	},

	// When component mounts, get the data and set the state of 'mapItems'
	componentDidMount(){
		this.mapRef = firebase.database().ref("Locations");
		this.mapRef.on("value", (snapshot)=> {
			if(snapshot.val()){
				this.setState({mapItems:snapshot.val()});
			}
		});
		$('#map').animate({opacity: '1'}, "slow");
	},
	
	 // Function to create a new post
    createPost(event) {
		event.preventDefault();
		
		if (event.target.title.value !== "") {
			// Get form info
			var d = new Date();
			this.mapRef.push({
				title:event.target.title.value,
				imgurl: this.state.uploadPicUrl,
				content:event.target.content.value,
				date: ((d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()),
				likes:0,
			});
		} else {
			alert("Post must have a title.");
		}
		this.setState({fileName: ""});
        event.target.reset();
    },

    // Function to like a post
    likePost(postId) {
        let ref = this.mapRef.child(postId);
        ref.once('value').then(function(snapshot) {
            var newLikes = parseInt(snapshot.val().likes) + 1;
            // Update on firebase
            ref.update({
                likes: newLikes
            });
        });
    },

	handleUploadStart(){
		this.setState({isUploading: true, fileName: $("#file-uploader").val().split('\\').pop()})
	},

	handleUploadError(error){
	  this.setState({isUploading: false});
	  console.error(error);
	},
	
	handleUploadSuccess(filename){
	  this.setState({avatar: filename, isUploading: false});
	  firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({uploadPicUrl: url}));
	},
	
	handleMarkerClick(key){
		console.log($("#" + key + "label"))
		$("#" + key + "label").hidden = "false"
		$("#" + key + "marker").padding = "15px"
	},
	
	// Render a <MapItem> element for each element in the state
	render() {
		const MyMapComponent = withScriptjs(withGoogleMap((props) =>
		  <GoogleMap
			defaultZoom={8}
			defaultCenter={{ lat: 47, lng: -122 }}
		  >

			{props.isMarkerShown && Object.keys(this.state.mapItems).map((d) => {
			return <MarkerWithLabel key={d}
							id={d + "marker"}
							position={{ lat: parseFloat(this.state.mapItems[d].latitude), lng: parseFloat(this.state.mapItems[d].longitude) }}
							labelAnchor={{x:0,y:0}}
							labelStyle={{backgroundColor: "white", fontSize: "24px", padding: "0px"}}
							onClick={this.handleMarkerClick(d)}
							>
					<div id={d + "label"} hidden = "true"><ListItem user={this.props.user} key={d} productRef={d} data={this.state.mapItems[d]} handleTrash={this.removeProduct}/></div>
					
					</MarkerWithLabel>
			})}
		  </GoogleMap>
		))
		return (
		//className='container' id='map'
			<div >
				  <MyMapComponent
					  isMarkerShown = {true}
					  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
					  loadingElement={<div style={{ height: `100%` }} />}
					  containerElement={<div style={{ height: `800px` }} />}
					  mapElement={<div style={{ height: `100%` }} />}
					/>
			</div>
		);
	}
});

export default MapPage;