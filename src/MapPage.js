// Page of blogs to show
import React from 'react';
import './css/Blog.css';
import firebase from 'firebase';
import $ from 'jquery';
import BlogItem from './BlogItem';
import PostBox from './PostBox';
import FirebaseConfig from './Config';


// BlogPage Component
var BlogPage = React.createClass({
	getInitialState(){
		return{blogItems:[], fileName:"", isUploading:false, uploadPicUrl:""}
	},

	// When component mounts, get the data and set the state of 'blogItems'
	componentDidMount(){
		this.blogRef = firebase.database().ref("Blog");
		this.blogRef.on("value", (snapshot)=> {
			if(snapshot.val()){
				this.setState({blogItems:snapshot.val()});
			}
		});
		$('#blog').animate({opacity: '1'}, "slow");
	},
	
	 // Function to create a new post
    createPost(event) {
		event.preventDefault();
		
		if (event.target.title.value !== "") {
			// Get form info
			var d = new Date();
			this.blogRef.push({
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
        let ref = this.blogRef.child(postId);
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
	
	// Render a <BlogItem> element for each element in the state
	render() {
		var a = Object.keys(this.state.blogItems);
		a.reverse();
		return (
			<div className='container' id='blog'>
				{(this.props.user ?
					<PostBox handleSubmit={this.createPost}
						isUploading={this.state.isUploading}
						handleUploadStart={this.handleUploadStart}
						handleUploadError={this.handleUploadError}
						handleUploadSuccess={this.handleUploadSuccess}
						handleProgress={this.handleProgress}
						filename={this.state.fileName}
					/>
				:false)}
				{a.map((d) => {
					return <BlogItem key={d} data={this.state.blogItems[d]} likePost={() => this.likePost(d)}
					/>
				})}
			</div>
		);
	}
});

export default BlogPage;