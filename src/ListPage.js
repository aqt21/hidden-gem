// Page of store items to show
import React from 'react';
import $ from 'jquery';
import './css/Store.css';
import StoreItem from './StoreItem';
import firebase from "firebase";
import FirebaseConfig from "./Config";
import FileUploader from 'react-firebase-file-uploader'; 

// StorePage Component
var StorePage = React.createClass({
	getInitialState(){
		return{storeItems:[], fileName:"", isUploading:false, uploadPicUrl:"", currRefId:"", showInfo:false}
	},

	// When component mounts, get the data and set the state of 'storeItems'
	componentDidMount(){

		this.storeRef = firebase.database().ref("Store");
		
		this.storeRef.on("value", (snapshot)=> {
			if(snapshot.val()){
				this.setState({storeItems:snapshot.val()});
			}
		});
		$('#store').animate({opacity: '1'}, "slow");
	},
	
	createProduct(event) {
		event.preventDefault();
		
		this.storeRef.push({
			title: event.target.elements["title"].value,
			imgurl: this.state.uploadPicUrl,
			description: event.target.elements["description"].value,
			price: "$" + event.target.elements["price"].value
		});
		
		this.setState({uploadPicUrl: "", fileName: ""});
		
		event.target.reset();
	},
	
	showProductInfo(event) {
		$("#productcover").animate({opacity: 0.7}, 300);
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
		$("#productcover").animate({opacity: 0}, 300);
		this.setState({showInfo:false});
	},
	
	removeProduct(event) {
		this.storeRef.child(event.target.id).remove();
	},
	
	// Render a <StoreItem> element for each element in the state
	render() {
		
		let currRef = this.state.currRefId;
		
		return (
			<div>
				<div id='store'>
					<div className='container'>
						{(this.state.showInfo ?
							<div className="card horizontal" id="productinfo">
								<div id="exitcontainer" onClick={this.hideProduct}>
									<i className="fa fa-times exit" aria-hidden="true"></i>
								</div>
								
								<div className="card-image">
									<img src={this.state.storeItems[currRef].imgurl} />
								</div>
								<div className="card-stacked">
									<div className="card-content">
									<h2>{this.state.storeItems[currRef].title}</h2>
									<p>{this.state.storeItems[currRef].description}</p>
									<br />
									<p>{"Price: " + this.state.storeItems[currRef].price}</p>
									</div>
									<div className="card-action">
										<a href="#">Buy Now</a>
									</div>
								</div>
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
						{Object.keys(this.state.storeItems).map((d) => {
								return <StoreItem user={this.props.user} key={d} productRef={d} data={this.state.storeItems[d]} handleTrash={this.removeProduct} handleClick={this.showProductInfo}/>
							})}
						</div>
					</div>
					
					
				</div>
				
				<div id="productcover">
				</div>
			</div>
		);
	}
});

export default StorePage;
