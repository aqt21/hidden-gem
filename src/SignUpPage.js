
import React from 'react';
import $ from 'jquery';
import SignUpItem from './SignUpItem';
import firebase from 'firebase';
import FirebaseConfig from './Config';

var SignUpPage = React.createClass({
	signUp(event){
		event.preventDefault();
		let email = event.target.elements['email'].value;
		let password = event.target.elements['password'].value;


		//sign up
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user) => {
			this.setState({user:firebase.auth().currentUser});
		})
		.then(this.reload)
		.then(this.props.router.push('/home'))
		//clear form
		//event.target.reset();
	},
	reload() {
		window.location.reload();
	},

    render() {
        return(
            <div className="container" id="signin">
                <SignUpItem submit={this.signUp} />
            </div>
        )
    }
});

export default SignUpPage;