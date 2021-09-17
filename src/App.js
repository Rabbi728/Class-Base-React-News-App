import React, { Component } from 'react'
import Navbar from './components/layouts/Navbar'
import List from './components/pages/List'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  state = {
    progress     : 0,
  }

  setProgress = (progress)=>{
    this.setState({
      progress      : progress,
    })
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/business"> <List setProgress={this.setProgress} key="business" category="business" /> </Route>
            <Route exact path="/entertainment"> <List setProgress={this.setProgress} key="entertainment" category="entertainment" /> </Route>
            <Route exact path="/"> <List setProgress={this.setProgress} key="general" category="general" /> </Route>
            <Route exact path="/health"> <List setProgress={this.setProgress} key="health" category="health" /> </Route>
            <Route exact path="/science"> <List setProgress={this.setProgress} key="science" category="science" /> </Route>
            <Route exact path="/sports"> <List setProgress={this.setProgress} key="sports" category="sports" /> </Route>
            <Route exact path="/technology"> <List setProgress={this.setProgress} key="technology" category="technology" /> </Route>
          </Switch>
        </Router>
      </>
    )
  }
}
