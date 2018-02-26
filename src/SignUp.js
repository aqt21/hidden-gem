// Sign up
import React from 'react';
import $ from 'jquery';

var SignUp = React.createClass({

    checkAdmin(){
        console.log("checked");
        $("#adminCheck").checked = !$("#adminCheck").checked;
        $("#adminDiv").toggle();
    },

    render() {
        return(
            <section className="container">
                <h3>Sign up for an Account</h3>
                <form onSubmit={this.props.submit} className="col s12 authenticate" id="sign-up">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="text" id="displayName" className="validate" />
                            <label htmlFor="displayName">Display Name</label>
                        </div>
                        <div>
                            <input type="checkbox" value="check" id="adminCheck" onClick={this.checkAdmin}/> <label>Are you signing up for an administrator account?</label> 
                            <div id="adminDiv" className="input-field col s12">
                                <input type="text" id="adminCode" className="validate"/>
                                <label htmlFor="adminCode">Administrator Key</label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary">Sign Up</button>
                </form>
            </section>
        )
    }
});

export default SignUp;