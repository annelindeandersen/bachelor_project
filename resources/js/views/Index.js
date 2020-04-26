import React from 'react';
import ReactDOM from 'react-dom';

// Views
import Home from './Home';
import Login from './Login';
import Register from './Register';

// Components

function Index() {
    return (
        <div className="container">
            <Home />
        </div>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
