// Sign up
import React from 'react';
import $ from 'jquery';

var SignIn = React.createClass({
    show(){
        $("#inputs").toggle();
    },

    render() {
        return(
            <div className="container" id="signin">
                <div onClick={this.show}>Administrator Sign-In</div>
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

export default SignIn;