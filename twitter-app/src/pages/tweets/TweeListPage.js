import React, { useState, useEffect } from 'react';
import ItemsCards from '../../components/ItemsCards.component.jsx';
import SearchControls from '../../components/SearchControls.component.jsx';
import Controls from '../../components/Controls.component.jsx';
import Loading from '../../components/Loading.component';
import configureAppStore from '../../store/configureAppStore';
import { tweetAdded, getFilteredTweets } from '../../store/tweets';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { fetchTweets } from '../store/tweets.js';

const port = process.env.REACT_APP_PORT;
const hostname = 'localhost';
console.log('port: ', port);

const urlWebSocket = `ws://${hostname}:${port}`;
// const url = `http://${hostname}:${port}`;

// web socket
const client = new W3CWebSocket(urlWebSocket);

const store = configureAppStore();

function TweetListPage() {
  const { items, setItem } = useState([]);
  const { searchTerm, setSearchTerm } = useState('JavaScript');
  store.subscribe(() => {
    console.log('store changed');
  });
  const state = store.getState();
  // const filteredTweets = getFilteredTweets(state);
  // store.dispatch(actions.tweetAdded());
  // store.dispatch(
  //   actions.apiCallBegan({
  //     url: '/tweets',
  //     method: 'get',
  //     // data: {}, // data to send to the server
  //     onSuccess: actions.apiCallSuccess.type,
  //     onError: actions.apiCallFailed.type,
  //   })
  // );

  const handleChange = (e) => setSearchTerm(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleResume();
    }
  };
  const handleResume = () => {
    let term = searchTerm;
    store.dispatch(fetchTweets(term));
    // fetch('/setSearchTerm', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ term }),
    // });
  };

  const handlePause = (e) => {
    fetch('/pause', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.info(dataFromServer);
      // let newList = [dataFromServer].concat(this.state.items.slice(0, 15));
      console.log('dataFromServer: ', dataFromServer);
      //  store.dispatch(actions.tweetAdded());
      store.dispatch(tweetAdded(dataFromServer));
      // setCallData((oldArray) => [
      //   ...oldArray,
      //   {
      //     timestamp: Date.now(),
      //     id: dataFromServer.id,
      //     duration: dataFromServer.duration,
      //   },
      // ]);
    };
  }, []);

  return (
    <div className="row">
      {/* <div className="col s12 m4 l4">
        <div className="input-field col s12">
          <SearchControls
            searchTerm={searchTerm}
            handleKeyPress={handleKeyPress}
            handleChange={handleChange}
          />

          {items.length > 0 ? (
            <Controls
              items={items}
              controlStyle={controlStyle}
              handleResume={handleResume}
              handlePause={handlePause}
            />
          ) : null}
        </div>
      </div>
      <div className="col s12 m4 l4">
        <div>
          {items.length > 0 ? <ItemsCards items={items} /> : <Loading />}
        </div>
      </div>
      <div className="col s12 m4 l4"></div> */}
    </div>
  );
}

const controlStyle = {
  marginRight: '5px',
};

export default TweetListPage;
