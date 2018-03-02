// Sign in
import React from 'react';
import $ from 'jquery';

var SignInItem = React.createClass({
	
    render() {
        return(
            <div className="container" id="signin">
			<h3>SIGN IN</h3>
                <form onSubmit={this.props.submit} className="col s4 authenticate" id="sign-up">
                    <div className="row" id="inputs">
						<input id="email" type="email" placeholder="Email" className="validate form col s4" />
						<div className="col s1"></div>
						<input id="password" type="password" placeholder="Password" className="validate form col s4" />
						<button id="signin-button" className="btn btn-primary">Sign In</button>
						
                    </div>
                    
                </form>
            </div>
        )
    }
});

export default SignInItem;