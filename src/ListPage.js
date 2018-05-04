// Page of List items to show
import React from 'react';
import $ from 'jquery';
import './css/List.css';
import ListItem from './ListItem';
import firebase from "firebase";
import FileUploader from 'react-firebase-file-uploader'; 

// ListPage Component
var ListPage = React.createClass({
	getInitialState(){
		return{listItems:[], fileName:"", isUploading:false, uploadPicUrl:"", currRefId:"", showInfo:false}
	},

	// When component mounts, get the data and set the state of 'listItems'
	componentDidMount(){

		this.listRef = firebase.database().ref("Locations");
		
		this.listRef.on("value", (snapshot)=> {
			if(snapshot.val()){
				this.setState({listItems:snapshot.val()});
			}
		});
		$('#list').animate({opacity: '1'});
	},
	
	createProduct(event) {
		event.preventDefault();
		
		this.listRef.push({
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
		$("#locationDetailsBackground").css("pointer-events","auto");
		$("#locationDetailsBackground").animate({opacity: 0.7}, 300);
		this.setState({currRefId: event.target.id, showInfo:true});
	},
	
	handleUploadStart(){
		this.setState({isUploading: true, fileName: $("#file-uploader").val().split('\\').pop()});
	},
	
	handleUploadError(error){
	  this.setState({isUploading: false});
	  console.error(error);
	},
	
	handleUploadSuccess(filename){
	  this.setState({avatar: filename, isUploading: false});
	  firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({uploadPicUrl: url}));

	},
	
	hideProduct() {
		$("#locationDetailsBackground").css("pointer-events","none");
		$("#locationDetailsBackground").animate({opacity: 0}, 300);
		this.setState({showInfo:false});
	},
	
	removeProduct(event) {
		this.listRef.child(event.target.id).remove();
	},
	
	// Render a <ListItem> element for each element in the state
	render() {
		
		let currRef = this.state.currRefId;
		
		return (
			<div id='list'>
				<div className='container' id="list-container">
					{(this.state.showInfo ?
						<div id="locationDetails">
							<div id="exitcontainer" onClick={this.hideProduct}>
								<i className="fa fa-times exit" aria-hidden="true"></i>
							</div>
							<div id="locationImage">
								<img src={this.state.listItems[currRef].imgurl} />
							</div>

							<h4>{this.state.listItems[currRef].title}</h4>
							<p>{this.state.listItems[currRef].description}</p>
							<p className="chip">Tag Example</p>
							<p className="chip">Tag Example</p>
							<p className="chip">Tag Example</p>
						</div>
						
					: false
					)}
					
					{(this.props.user ?
					<div className="card-panel">
						<form className="col s12 active" onSubmit = {this.createProduct}>
							<div className="input-field col s6">
								<input id="title" type="text"></input>
								<label htmlFor="title">Product Title</label>
							</div>
							
							<div className="input-field col s6" >
								<textarea className="materialize-textarea" id="description" type="text"></textarea>
								<label htmlFor="description">Product Description</label>
							</div>
							
							<div className="input-field col s6">
								<input id="price" type="text"></input>
								<label htmlFor="price">Product Price</label>
							</div>
							
							<div className="input-field col s6">
								<FileUploader
									className="file-path validate"
									id="file-uploader"
									accept="image/*"
									randomizeFilename
									storageRef={firebase.storage().ref("images")}
									onUploadStart={this.handleUploadStart}
									onUploadError={this.handleUploadError}
									onUploadSuccess={this.handleUploadSuccess}
									onProgress={this.handleProgress}
								  />
								<div className="btn waves-effect waves-light"><label id="imagebtn" htmlFor="file-uploader"></label>Upload An Image</div>
								
								{(this.state.isUploading ?
									<div>
										<br />
										<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
										<span className="sr-only">Loading...</span>
										<p className="center-align">Uploading image. Please Wait.</p>
									</div>
								: [(this.state.fileName ? <p key={this.state.fileName} className="center-align">Finished Uploading {this.state.fileName}</p> : false)]
								)}							
							</div>
							
							<br />
							<button id="productsubmit" type="submit" disabled={this.state.isUploading} className="submit btn waves-effect waves-light" name="action">Post Product For Sale</button>
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
				
				<div id="locationDetailsBackground" onClick={this.hideProduct}></div>
			</div>
				
		);
	}
});

export default ListPage;
