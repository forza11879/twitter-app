import React from 'react';
// import './pagination.styles.css';

// const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
/* <ul className="pagination">
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
</ul>; */
//   );
// };

// export default Pagination;

function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
  const [pages] = React.useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = React.useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = allTweetIds.slice(indexOfFirstPost, indexOfLastPost);

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  };

  return (
    <div>
      {/* show the posts, 4 posts at a time */}
      <div className="dataContainer">
        {getPaginatedData().map((item, index) => (
          <RenderComponent key={index} data={item} />
        ))}
      </div>

      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 5 page
          numbers at a time
      */}
      <ul className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? 'active' : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
      </ul>
    </div>
  );
}

export default Pagination;
