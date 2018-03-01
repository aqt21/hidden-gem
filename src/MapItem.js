import React from 'react';

// Returns a MapItem object showing its title, image/link, and description.
var MapItem = React.createClass({
	getInitialState(){
		return{expanded:false}
	},

	handleClick(){
		console.log(this.props.data.imgurl);
		var isExpanded = !this.state.expanded;
		this.setState({expanded:isExpanded});
		console.log(this.state.expanded);
		
		if(this.state.expanded){
			console.log('close');
		} else {
			console.log('open');
		}
	
	},
	
    render() {
		return(      
			<div className='map-item'>
				<div className='card-panel'>
					<div className='content-header'>
						<h5>{this.props.data.title}</h5>
						<div className='likes' onClick={this.props.likePost}>{this.props.data.likes}  <i className="fa fa-heart like-button" aria-hidden="true"></i></div>
						<p className='date'>{this.props.data.date}</p>
						
						{!this.state.expanded ?
							<div className='text-preview'>{this.props.data.content.substring(0,110) + " ..."}</div>
						:false}
						
					</div>	
					
					{this.state.expanded ?
						<div className='content'>
							{this.props.data.imgurl ? <img src={this.props.data.imgurl} />:false}
							{this.props.data.content ? <p className='text'>{this.props.data.content}</p>:false}
						</div>
					:false}
					
					<div className='toggle-expand' onClick={this.handleClick}>
						{this.state.expanded ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>}
					</div>
				</div>
			</div>	
        )
    }
});

export default MapItem;
