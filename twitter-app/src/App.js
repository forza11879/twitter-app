import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TweetListPage from './pages/tweets/TweeListPage.jsx';
import './App.css';

function App() {
  return (
    <React.Fragment>
      {/* // Switch prevents rendering multiple components */}
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        {/* <Route exact={true} path="/" component={AccountPage} /> */}
        <Route exact={true} path="/" component={TweetListPage} />
        {/* <Route path="/stock" component={StockPage} /> */}
      </Switch>
    </React.Fragment>
  );
}

export default App;
