import { useState } from 'react'
import Navbar from './components/layouts/Navbar'
import List from './components/pages/List'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const [progress, setProgress] = useState(0)
  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          color="#f11946"
          height={3}
          progress={progress}
        />
        <Switch>
          <Route exact path="/business"> <List setProgress={setProgress} key="business" category="business" /> </Route>
          <Route exact path="/entertainment"> <List setProgress={setProgress} key="entertainment" category="entertainment" /> </Route>
          <Route exact path="/"> <List setProgress={setProgress} key="general" category="general" /> </Route>
          <Route exact path="/health"> <List setProgress={setProgress} key="health" category="health" /> </Route>
          <Route exact path="/science"> <List setProgress={setProgress} key="science" category="science" /> </Route>
          <Route exact path="/sports"> <List setProgress={setProgress} key="sports" category="sports" /> </Route>
          <Route exact path="/technology"> <List setProgress={setProgress} key="technology" category="technology" /> </Route>
        </Switch>
      </Router>
    </>
  )
}
