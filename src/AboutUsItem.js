import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.css';

// Returns a about us item containing the experience, position I held, date, and description.
var AboutUsItem = React.createClass({
    render() {
		return(
			<div className='about-item'>
				<div>
					<i className="fa fa-birthday-cake medium"></i>
					<p className="hometext">{this.props.info}</p>
				</div>
					
			</div>
        )
    }
});

export default AboutUsItem;
