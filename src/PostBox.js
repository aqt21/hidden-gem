// PostBox component
import React from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader'; 

var PostBox = React.createClass({
    render() {
        return(
            <div className='blog-post'>
				<div className='card-panel'>
					<h5>Create Post</h5>
					<form onSubmit={this.props.handleSubmit}>
						<div className="input-field col s12">
							<input id="title" type="text" />
							<label htmlFor="title">Title</label>
						</div> 
						
						<div className="input-field col s12">
							<textarea id='content' className='materialize-textarea'></textarea>
							<label htmlFor="content">Text</label>
						</div>
						
						<div id='upload' className="input-field col s6">
							<FileUploader
								className="file-path validate"
								id="file-uploader"
								accept="image/*"
								randomizeFilename
								storageRef={firebase.storage().ref("images")}
								onUploadStart={this.props.handleUploadStart}
								onUploadError={this.props.handleUploadError}
								onUploadSuccess={this.props.handleUploadSuccess}
								onProgress={this.props.handleProgress}
							/>
							<div className="btn waves-effect waves-light"><label id="imagebtn" htmlFor="file-uploader"></label>Upload Image</div>
							{(this.props.isUploading ?
								<div>
									<br />
									<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
									<span className="sr-only">Loading...</span>
									<p className="center-align">Uploading image. Please Wait.</p>
								</div>
							: [(this.props.filename ? <p key={this.props.filename} className="center-align">Finished Uploading {this.props.filename}</p> : false)]
							)}	
						</div>
						
						 <button type="submit" className="btn waves-effect waves-light" disabled={this.props.isUploading}>post</button>
					</form>
				</div>
			</div>	
        )
    }
});

export default PostBox;