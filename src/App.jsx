import React from "react";

import { Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./routes/Home";
import FormEntry from "./routes/FormEntry";

const App = () => (
  <>
    <NavBar />
    <Route path="/" exact component={Home} />
    <Route path="/create" component={FormEntry} />
    <Route path="/edit/:id" component={FormEntry} />
  </>
);
export default App;
