// Sign out
import React from 'react';

var SignOut = React.createClass({
    render() {
        return(
            <button onClick={this.props.submit} className="btn btn-primary sign-out">Sign Out</button>
        )
    }
});

export default SignOut;