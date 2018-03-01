// Sign in
import React from 'react';
import $ from 'jquery';
import SignInItem from './SignInItem';
import firebase from 'firebase';
import FirebaseConfig from './Config';

var SignInPage = React.createClass({
	signIn(event){
		event.preventDefault();

		let email = event.target.elements['email'].value;
		let password = event.target.elements['password'].value;


		//sign in
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user) => {
			this.setState({user:firebase.auth().currentUser});
		})
		//clear form
		event.target.reset();
	},

    render() {
        return(
            <div className="container" id="signin">
                <SignInItem submit={this.signIn} />
            </div>
        )
    }
});

export default SignInPage;