import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HomePageComponent from "./Index/component/IndexComponent";

export default class App extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
        view : 0
      }
  }

  render() {

    return (
      <div className="App">
        <div className="container-fluid text-white">
          <Router>
                <div className="content" >
                  <Switch>
                    <Route path="/" component={HomePageComponent} />
                  </Switch>
                </div>
          </Router>
        </div>
      </div>
    )
  }
}


