import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ItemsCards from '../../components/ItemsCards.component.jsx';
import SearchControls from '../../components/SearchControls.component.jsx';
import Controls from '../../components/Controls.component.jsx';
import Loading from '../../components/Loading.component';

function TweetListPage() {
  const { items, setItem } = useState([]);
  const { searchTerm, setSearchTerm } = useState('JavaScript');
  const handleChange = (e) => setSearchTerm(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleResume();
    }
  };
  const handleResume = () => {
    let term = searchTerm;
    fetch('/setSearchTerm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ term }),
    });
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
    const socket = socketIOClient('http://localhost:3000/');

    socket.on('connect', () => {
      console.log('Socket Connected');
      socket.on('tweets', (data) => {
        console.info(data);
        let newList = [data].concat(items.slice(0, 15));
        setItem(newList);
      });
    });
    socket.on('disconnect', () => {
      socket.off('tweets');
      socket.removeAllListeners('tweets');
      console.log('Socket Disconnected');
    });
  }, [items, setItem]);

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

export default TweetListPage;
