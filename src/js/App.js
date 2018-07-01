import React, {Component} from 'react';
import PCIndex from "./components/pc_index";
import MediaQuery from 'react-responsive';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import PCNewsDetail from "./components/pc_news_detail";
import MobileUserCenter from "./components/mobile_usercenter";
import MobileIndex from "./components/mobile_index";
import MobileNewsDetail from "./components/mobile_news_detail";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <Switch>
                            <Route exact path='/' component={PCIndex}/>
                            <Route path='/details/:uniquekey' component={PCNewsDetail}/>
                        </Switch>
                    </MediaQuery>

                    <MediaQuery query="(max-device-width: 1224px)">
                        <Switch>
                            <Route exact path='/' component={MobileIndex}/>
                            <Route path='/details/:uniquekey' component={MobileNewsDetail}/>
                        </Switch>
                    </MediaQuery>
                </div>
            </Router>
        );
    }
}



export default App;