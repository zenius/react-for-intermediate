import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/common/Header";
import List from "./components/List";
import NotFound from "./components/NotFound";
import Detail from "./components/Detail";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={Detail} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
