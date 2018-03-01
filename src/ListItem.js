import React from 'react';

// Returns a list item containing the experience, position I held, date, and description.
var ListItem = React.createClass({
    render() {
		console.log(this.props.data)
		return(
			<div className="col s12 m6 l3">
			  <div className="card medium">
				<div className="card-image">
				  <img id="cardimg" src={this.props.data.imgurl} />
				</div>
				<div className="card-content">
				  <h5>{this.props.data.title}</h5>
				  <p>{this.props.data.description.substring(0,50) + " ..."}</p>
				  <br/>
				  <p>Rating: {this.props.data.rating}</p>
				  {(this.props.user ?
					<i className="fa fa-trash trash" aria-hidden="true" onClick={this.props.handleTrash} id={this.props.productRef}></i>
				  :false
				  )}
				</div>
				<div className="card-action">
				  <a className="s6 infobtn" onClick={this.props.handleClick} id={this.props.productRef}>More Info</a>
				</div>
			  </div>
			</div>
        )
    }
});

export default ListItem;
