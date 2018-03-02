// Sign out
import React from 'react';

var SignOut = React.createClass({
    render() {
        return(
            <a onClick={this.props.submit}>Sign Out</a>
        )
    }
});

export default SignOut;