import React from 'react';
import $ from 'jquery';

// Returns a list item containing the experience, position I held, date, and description.
var ListItem = React.createClass({

	
    render() {
		console.log(this.props.data)
		return(
			<div className="col s12 m6 l4">
			  <div className="card hoverable">
			  <div className="clickable" onClick={this.props.handleClick} id={this.props.productRef}></div>
				<div className="card-image" style={{ backgroundImage: `url(${this.props.data.imgurl})` }}>
				 
				</div>
				<div className="card-content">
					<span className="card-title">{this.props.data.title}</span>
					<p>{this.props.data.description.substring(0,125) + " ..."}</p>
				</div>
			  </div>
			</div>
		
		
			// <div className="col s12 m6 l3">
			  // <div className="card medium hoverable">
				// <div className="card-image">
				  // <img id="cardimg" src={this.props.data.imgurl} />
				// </div>
				// <div className="card-content">
				  // <h6 className="card-title left-align"><b>{this.props.data.title}</b></h6>
				  // <div className="heart right-align"></div>
				  // <p className="card-info left-align">{this.props.data.description.substring(0,75) + " ..."}</p>
				  // <br/>
				  // <p>Rating: {this.props.data.rating}</p>
				  // {(this.props.user ?
					// <i className="fa fa-trash trash" aria-hidden="true" onClick={this.props.handleTrash} id={this.props.productRef}></i>
				  // :false
				  // )}
				// </div>
				// <div className="card-action">
				  // <a className="s6 infobtn" onClick={this.props.handleClick} id={this.props.productRef}>More Info</a>
				// </div>
			  // </div>
			// </div>
        )
    }
});

export default ListItem;
