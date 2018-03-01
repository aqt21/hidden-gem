import React from 'react';

// Returns a store item containing the experience, position I held, date, and description.
var StoreItem = React.createClass({
    render() {
		return(
			<div className="col s12 m6 l3">
			  <div className="card medium">
				<div className="card-image">
				  <img id="cardimg" src={this.props.data.imgurl} />
				</div>
				<div className="card-content">
				  <h5>{this.props.data.title}</h5>
				  <p>{this.props.data.description.substring(0,33) + " ..."}</p>
				  <br/>
				  <p>Rating: {this.props.data.rating}</p>
				  {(this.props.user ?
					<i className="fa fa-trash trash" aria-hidden="true" onClick={this.props.handleTrash} id={this.props.productRef}></i>
				  :false
				  )}
				</div>
				<div className="card-action">
				  <a className="s6" href="https://www.paypal.com/cgi-bin/webscr?cmd=_cart&business=N6CKCGD7UVY6W&lc=US&item_name=Placeholder%20Bread&amount=9%2e99&currency_code=USD&button_subtype=products&tax_rate=0%2e000&shipping=0%2e00&add=1&bn=PP%2dShopCartBF%3abtn_cart_LG%2egif%3aNonHosted">Buy Now</a>
				  <a className="s6 infobtn" onClick={this.props.handleClick} id={this.props.productRef}>More Info</a>
				</div>
			  </div>
			</div>
        )
    }
});

export default StoreItem;
