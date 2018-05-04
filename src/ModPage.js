// Page of List items to show
import React from 'react';
import $ from 'jquery';
import './css/List.css';
import ListItem from './ListItem';
import firebase from "firebase";
import FileUploader from 'react-firebase-file-uploader'; 
import Materialize from "materialize-css";
import M from "react-materialize";

// ModPage Component
var ModPage = React.createClass({
	getInitialState(){
		return{listItems:[], fileName:"", isUploading:false, uploadPicUrl:"", currRefId:"", showInfo:false, currTab: "Pending Review"}
	},

	// When component mounts, get the data and set the state of 'listItems'
	componentDidMount(){
		this.listRef = firebase.database().ref(this.state.currTab);
		this.listRef.on("value", (snapshot)=> {
			if(snapshot.val()){
				this.setState({listItems:snapshot.val()});
			}
		});
		$('#mod').animate({opacity: '1'});
	},
		
	componentDidUpdate(prevProps, prevState) {
		if(prevState.currTab != this.state.currTab){
		this.listRef = firebase.database().ref(this.state.currTab);
		this.listRef.on("value", (snapshot)=> {
			if(snapshot.val()){
				this.setState({listItems:snapshot.val()});
			}
		});
		$('#mod').animate({opacity: '1'});
		}
	},
	
	saveChanges(event) {
		event.preventDefault();
		firebase.database().ref(this.currRefId).update({
			title: event.target.elements["title"].value,
			imgurl: this.state.uploadPicUrl,
			description: event.target.elements["description"].value,
			rating: event.target.elements["rating"].value,
			latitude: event.target.elements["latitude"].value,
			longitude: event.target.elements["longitude"].value
		});
		
		this.setState({uploadPicUrl: "", fileName: ""});
		
		event.target.reset();
	},
	
	showProductInfo(event) {
		$("#locationDetailsBackground").animate({opacity: 0.7}, 300);
		this.setState({currRefId: event.target.id, showInfo:true});
	},
	
	hideProduct() {
		$("#locationDetailsBackground").animate({opacity: 0}, 300);
		this.setState({showInfo:false});
	},
	
	handlePending(){
		this.setState({currTab: "Pending Review"});
	},
	handleApproved(){
		this.setState({currTab: "Locations"});
	},
	handleDiscarded(){
		this.setState({currTab: "Discarded"});
	},
	removeProduct(event) {
		this.listRef.child(event.target.id).remove();
	},
	changeText(event){
		M.updateTextFields();
    },
	
	// Render a <ListItem> element for each element in the state
	render() {
		
		let currRef = this.state.currRefId;
		
		return (
			<div>
				<div id='mod'>
					<div className='container'>
						<div id="modControls">
							<a className="waves-effect waves-light btn-large" onClick={() => this.handlePending()}>Pending Review</a>
							<a className="waves-effect waves-light btn-large" onClick={() => this.handleApproved()}>Approved</a>
							<a className="waves-effect waves-light btn-large" onClick={() => this.handleDiscarded()}>Discarded</a>
						</div>
							{(this.state.showInfo ?
							<div id="locationDetails">
								<div id="exitcontainer" onClick={this.hideProduct}>
									<i className="fa fa-times exit" aria-hidden="true"></i>
								</div>
								<form className="col s12" onSubmit={this.saveChanges}>
									<div className="locationImage">
										<img src={this.state.listItems[currRef].imgurl} />
									</div>
										
									<div className="row">
									<div className="input-field col s12">
										<input value={this.state.listItems[currRef].title} id="title" type="text" onChange={this.changeText} />
										<label className="active" htmlFor="title">Title</label>
										
									</div>
									</div>
									
									<div className="row">
									<div className="input-field col s12" >
										<textarea className="materialize-textarea" id="description" type="text" value={this.state.listItems[currRef].description} onChange={this.changeText} />
										<label className="active" htmlFor="description">Description</label>
									</div>
									</div>
									
									<div className="row">
									<div className="input-field col s6">
										<input id="latitude" type="text" value={this.state.listItems[currRef].latitude} onChange={this.changeText} />
										<label className="active" htmlFor="price">Latitude</label>
									</div>

									<div className="input-field col s6">
										<input id="longitude" type="text" value={this.state.listItems[currRef].longitude} onChange={this.changeText} />
										<label className="active" htmlFor="price">Longitude</label>
									</div>
									</div>
									
									<div className="row">
									<div className="input-field col s12">
										<input id="filters" type="text" value={this.state.listItems[currRef].filters} onChange={this.changeText} />
										<label className="active" htmlFor="price">Filters</label>
									</div>
									</div>
									
									<br />
									<button id="productsubmit" type="submit" onClick={this.hideProduct} disabled={this.state.isUploading} className="submit btn waves-effect waves-light" name="action">Save</button>
								</form>
							</div>
						: false
						)}
						

						
						<div className="row">
						{Object.keys(this.state.listItems).map((d) => {
								return <ListItem user={this.props.user} key={d} productRef={d} data={this.state.listItems[d]} handleTrash={this.removeProduct} handleClick={this.showProductInfo}/>
							})}
						</div>
					</div>
					
					
				</div>
				
				<div id="locationDetailsBackground">
				</div>
			</div>
		);
	}
});

export default ModPage;
