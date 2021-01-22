import React, { useState, useEffect } from 'react';
import ItemsCards from './ItemsCards.component.jsx';
import SearchForm from './form/Search-form.component';
import Controls from './Controls.component.jsx';
import Loading from './Loading.component.jsx';
import Pagination from './Pagination.component';
import {
  tweetStoreReseted,
  setTweetTerm,
  fetchTweetsPause,
  selectAllTweetIds,
  getTweet,
} from '../store/tweets.js';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useDispatch, useSelector } from 'react-redux';
// import { setTweetTerm } from '../store/action/saga.js';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const initialValue = {
    text: '',
  };

  const [searchTerm, setSearchTerm] = useState(initialValue);

  const dispatch = useDispatch();
  const allTweetIds = useSelector(selectAllTweetIds);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      dispatch(getTweet(message.data));
    };
  }, [dispatch]);

  const handleResume = (term) => {
    dispatch(tweetStoreReseted());
    console.log('term: ', term);
    // dispatch(fetchTweets(term));
    dispatch(setTweetTerm(term));
  };

  const handlePause = () => {
    dispatch(fetchTweetsPause());
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allTweetIds.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="row">
      <div className="col s12 m4 l4">
        <div className="input-field col s12">
          <SearchForm initialValues={searchTerm} handleResume={handleResume} />

          {allTweetIds.length > 0 ? (
            <Controls allTweetIds={allTweetIds} handlePause={handlePause} />
          ) : null}
        </div>
      </div>
      <div className="col s12 m4 l4">
        <div>
          {allTweetIds.length > 0 ? (
            <ItemsCards allTweetIds={currentPosts} />
          ) : (
            <Loading />
          )}
        </div>
        <div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allTweetIds.length}
            paginate={paginate}
          />
        </div>
      </div>
      <div className="col s12 m4 l4"></div>
    </div>
  );
}

export default TweetList;
