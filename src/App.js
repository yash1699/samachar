import './App.css';

import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const [progress, setProgress] = useState(0)
  const [keyword, setKeyword] = useState('')

  const changeProgress = (progress) => {
    setProgress(progress)
  }

  const apiKey = process.env.REACT_APP_NEWS_API_KEY
  let pageSize = 25;
  return (
    <div>
      <Router>
        <Navbar setKeyword={setKeyword} />
        <LoadingBar
          color='#03d7fc'
          progress={progress}
        />
        <Switch>
          <Route exact path="/"><News setProgress={changeProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category="general" /></Route>
          <Route exact path="/business"><News setProgress={changeProgress} apiKey={apiKey} key="business" pageSize={pageSize} country='in' category="business" /></Route>
          <Route exact path="/entertainment"><News setProgress={changeProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country='in' category="entertainment" /></Route>
          <Route exact path="/health"><News setProgress={changeProgress} apiKey={apiKey} key="health" pageSize={pageSize} country='in' category="health" /></Route>
          <Route exact path="/science"><News setProgress={changeProgress} apiKey={apiKey} key="science" pageSize={pageSize} country='in' category="science" /></Route>
          <Route exact path="/sports"><News setProgress={changeProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country='in' category="sports" /></Route>
          <Route exact path="/technology"><News setProgress={changeProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country='in' category="technology" /></Route>
          <Route exact path="/search"><News setProgress={changeProgress} apiKey={apiKey} key={keyword} pageSize={pageSize} country='in' category='' keyword={keyword} /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

