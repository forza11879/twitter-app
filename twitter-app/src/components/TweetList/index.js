import React, { useState, useEffect } from 'react';
import Card from './Card';
import SearchForm from '../form/Search-form';
import Controls from './Controls';
import Loading from './Loading';
import Pagination from './Pagination';
import {
  tweetStoreReseted,
  setTweetTerm,
  fetchTweetsPause,
  selectAllTweetIds,
  getTweet,
} from '../../store/tweets.js';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useDispatch, useSelector } from 'react-redux';

const port = process.env.REACT_APP_PORT;
const hostname = process.env.REACT_APP_LOCALHOST;

console.log('port: ', port);
console.log('localhost: ', hostname);

const urlWebSocket = `ws://${hostname}:${port}`;
// web socket
const client = new W3CWebSocket(urlWebSocket);

function TweetList() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(4);
  // const [time, setTime] = useState(new Date());

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
  // using for profiling
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleResume = (term) => {
    dispatch(tweetStoreReseted());
    console.log('term: ', term);
    dispatch(setTweetTerm(term));
  };

  const handlePause = () => {
    dispatch(fetchTweetsPause());
  };

  // // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = allTweetIds.slice(indexOfFirstPost, indexOfLastPost);

  // // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="row">
      <div className="col s12 m4 l4">
        <div className="input-field col s12">
          {/* <h1>{time.toISOString()}</h1> */}
          <SearchForm handleResume={handleResume} />
          {allTweetIds.length > 0 ? (
            <Controls handlePause={handlePause} />
          ) : null}
        </div>
      </div>
      <div className="col s12 m4 l4">
        <div>
          {allTweetIds.length > 0 ? (
            <Pagination
              data={allTweetIds}
              RenderComponent={Card}
              pageLimit={5}
              dataLimit={4}
            />
          ) : (
            <Loading />
          )}
        </div>
        <div>
          {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allTweetIds.length}
            paginate={paginate}
          /> */}
        </div>
      </div>
      <div className="col s12 m4 l4"></div>
    </div>
  );
}

export default TweetList;
