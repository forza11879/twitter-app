import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className="disabled waves-effect">
        <a href="#!">
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      {pageNumbers.map((number) => (
        <li key={number} className="active waves-effect">
          <a onClick={() => paginate(number)} href="#!" className="page-link">
            {number}
          </a>
        </li>
      ))}
      <li className="disabled waves-effect">
        <a href="#!">
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
