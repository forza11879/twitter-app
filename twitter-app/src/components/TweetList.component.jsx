import React, { useState, useEffect } from 'react';
import ItemsCards from './ItemsCards.component.jsx';
import SearchControls from './SearchControls.component.jsx';
import SearchForm from './form/Search-form.component';
import Controls from './Controls.component.jsx';
import Loading from './Loading.component.jsx';
import {
  tweetAdded,
  tweetStoreReseted,
  fetchTweets,
  fetchTweetsWebSocket,
  fetchTweetsPause,
  selectAllTweetIds,
  selectFilteredTweets,
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
// console.log('web socket client: ', client);

function TweetList() {
  const initialValue = {
    text: '',
  };

  const [searchTerm, setSearchTerm] = useState(initialValue);
  // const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const filteredTweet = useSelector(selectFilteredTweets);
  const allTweetIds = useSelector(selectAllTweetIds);

  useEffect(() => {
    // dispatch(fetchTweetsWebSocket(JSON.stringify(client)));

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      dispatch(tweetAdded(dataFromServer));
    };
  }, [dispatch]);

  // const handleChange = (e) => setSearchTerm(e.target.value);
  // const handleChange = (newProps) => {
  //   setSearchTerm((prevState) => ({
  //     ...prevState,
  //     ...newProps,
  //   }));
  // };

  const handleChange = (newProps) => {
    console.log('newPros: ', newProps);
    // setSearchTerm({
    //   ...newProps,
    //   // text: newProps,
    // });
    setSearchTerm(newProps);
    console.log('searchTerm: ', searchTerm);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // handleResume();
      console.log('term: ', searchTerm);
    }
  };
  const handleResume = (term) => {
    dispatch(tweetStoreReseted());
    // let term = searchTerm;
    console.log('term: ', term);
    // dispatch(fetchTweets(term));
    fetch(`http://localhost:3000/setsearchterm/${term}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ term }),
    });
  };

  const handlePause = () => {
    // dispatch(fetchTweetsPause());
    fetch('http://localhost:3000/pause', {
      method: 'GET',
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
          <SearchForm
            initialValues={searchTerm}
            handleKeyPress={handleKeyPress}
            handleChange={handleChange}
            handleResume={handleResume}
          />

          {allTweetIds.length > 0 ? (
            <Controls
              allTweetIds={allTweetIds}
              controlStyle={controlStyle}
              handleResume={handleResume}
              handlePause={handlePause}
            />
          ) : null}
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
