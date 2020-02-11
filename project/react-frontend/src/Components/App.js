import React, {Component} from 'react';
import AppNavigation from "../Navigation/Routes";

class App extends Component {

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <AppNavigation/>
            </div>
        )
    }
}

export default App;
