import React, { useState, useEffect } from 'react';
import ItemsCards from './ItemsCards.component.jsx';
import SearchControls from './SearchControls.component.jsx';
import Controls from './Controls.component.jsx';
import Loading from './Loading.component.jsx';

import { tweetAdded, getFilteredTweets, fetchTweets } from '../store/tweets.js';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useDispatch, useSelector } from 'react-redux';

const port = process.env.REACT_APP_PORT;
const hostname = 'localhost';
console.log('port: ', port);

const urlWebSocket = `ws://${hostname}:${port}`;
// const url = `http://${hostname}:${port}`;

// web socket
const client = new W3CWebSocket(urlWebSocket);

function TweetList() {
  // const { items, setItem } = useState([]);
  const { searchTerm, setSearchTerm } = useState('JavaScript');
  const dispatch = useDispatch();
  //   useSelector(state=>state.entities.bugs.list)
  const filteredTweets = useSelector(getFilteredTweets);
  const items = useSelector(getFilteredTweets);

  //   store.subscribe(() => {
  //     console.log('store changed');
  //   });
  //   const state = store.getState();
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

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      // console.info(dataFromServer);
      // let newList = [dataFromServer].concat(this.state.items.slice(0, 15));
      // console.log('dataFromServer: ', dataFromServer);
      //  store.dispatch(actions.tweetAdded());
      dispatch(tweetAdded(dataFromServer));

      // setCallData((oldArray) => [
      //   ...oldArray,
      //   {
      //     timestamp: Date.now(),
      //     id: dataFromServer.id,
      //     duration: dataFromServer.duration,
      //   },
      // ]);
    };
    // console.log('filteredTweetss: ', filteredTweets);
    console.log('filteredTweetss: ', items);
    // if (!filteredTweets) {
    //   console.log(('filteredTweets Not: ', filteredTweets));
    // } else {
    //   setItem(filteredTweets);
    // }
  }, [dispatch, items]);

  const handleChange = (e) => setSearchTerm(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleResume();
    }
  };
  const handleResume = () => {
    let term = searchTerm;
    dispatch(fetchTweets(term));
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
  return (
    <div className="row">
      <div className="col s12 m4 l4">
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
      <div className="col s12 m4 l4"></div>
    </div>
  );
}

const controlStyle = {
  marginRight: '5px',
};

export default TweetList;
