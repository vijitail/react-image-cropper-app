import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Upload from "./pages/Upload";
import Images from "./pages/Images";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Upload} />
            <Route path="/images" component={Images} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
