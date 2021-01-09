import React from 'react';
import { useSelector } from 'react-redux';
import { selectTweetById, selectUserById } from '../store/tweets.js';

function Card({ data }) {
  const { user, text, created_at } = useSelector(selectTweetById(data));
  const { profile_image_url, name, screen_name } = useSelector(
    selectUserById(user)
  );
  return (
    <div>
      <div className="card-panel grey lighten-5 z-depth-3 hoverable thin">
        <div className="row valign-wrapper">
          <div className="col s2">
            <img
              src={profile_image_url}
              alt={name}
              className="circle responsive-img"
            />
          </div>
          <div className="col s10 left-align">
            <span className="black-text">{text}</span>
          </div>
        </div>
        <div className="row valign-wrapper right-align chip hoverable">
          {new Date(created_at).toLocaleTimeString()}
        </div>
        <div className="row valign-wrapper right-align chip hoverable">
          <a href={`https://twitter.com/${screen_name}`} target="_blank">
            {`@${screen_name}`}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
