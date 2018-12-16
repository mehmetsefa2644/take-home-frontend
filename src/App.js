import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Accounts from "./components/Accounts";
import Detail from "./components/Detail";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{marginTop: '20px', marginLeft: '300px', marginRight: '300px'}}>
          <Route exact path="/" component={Accounts} />
          <Route path="/detail/:id" component={Detail} />
        </div>
      </Router>
    );
  }
}

export default App;
