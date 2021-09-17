import React, { Component } from 'react'
import Navbar from './components/layouts/Navbar'
import List from './components/pages/List'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/business"> <List key="business" category="business" /> </Route>
            <Route exact path="/entertainment"> <List key="entertainment" category="entertainment" /> </Route>
            <Route exact path="/"> <List key="general" category="general" /> </Route>
            <Route exact path="/health"> <List key="health" category="health" /> </Route>
            <Route exact path="/science"> <List key="science" category="science" /> </Route>
            <Route exact path="/sports"> <List key="sports" category="sports" /> </Route>
            <Route exact path="/technology"> <List key="technology" category="technology" /> </Route>
          </Switch>
        </Router>
      </>
    )
  }
}
