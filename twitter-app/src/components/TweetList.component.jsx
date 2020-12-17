import React, { useState, useEffect } from 'react';
import ItemsCards from './ItemsCards.component.jsx';
import SearchControls from './SearchControls.component.jsx';
import Controls from './Controls.component.jsx';
import Loading from './Loading.component.jsx';
import {
  tweetAdded,
  getFilteredTweets,
  fetchTweets,
  getAllTweetIds,
} from '../store/tweets.js';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useDispatch, useSelector } from 'react-redux';

const port = process.env.REACT_APP_PORT;
const hostname = process.env.REACT_APP_LOCALHOST;

console.log('port: ', port);
console.log('localhost: ', hostname);

const urlWebSocket = `ws://${hostname}:${port}`;
// const url = `http://${hostname}:${port}`;

// web socket
const client = new W3CWebSocket(urlWebSocket);

function TweetList() {
  const { searchTerm, setSearchTerm } = useState('JavaScript');
  const dispatch = useDispatch();
  const filteredTweet = useSelector(getFilteredTweets);
  const allTweetIds = useSelector(getAllTweetIds);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      dispatch(tweetAdded(dataFromServer));
    };
  }, [dispatch]);

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
          {/* <SearchControls
            searchTerm={searchTerm}
            handleKeyPress={handleKeyPress}
            handleChange={handleChange}
          /> */}

          {/* {items.length > 0 ? (
            <Controls
              items={items}
              controlStyle={controlStyle}
              handleResume={handleResume}
              handlePause={handlePause}
            />
          ) : null} */}
        </div>
      </div>
      <div className="col s12 m4 l4">
        <div>
          {allTweetIds.length > 0 ? (
            <ItemsCards allTweetIds={allTweetIds} />
          ) : (
            <Loading />
          )}
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
