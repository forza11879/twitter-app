function SearchControls({ searchTerm, handleKeyPress, handleChange }) {
  return (
    <div>
      <input
        id="email"
        type="text"
        className="validate"
        value={searchTerm}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
      />
      <label htmlFor="email">Search</label>
    </div>
  );
}

export default SearchControls;

// let searchControls = (
//   <div>
//     <input
//       id="email"
//       type="text"
//       className="validate"
//       value={searchTerm}
//       onKeyPress={handleKeyPress}
//       onChange={handleChange}
//     />
//     <label htmlFor="email">Search</label>
//   </div>
// );

// let filterControls = (
//   <div>
//     <a
//       className="btn-floating btn-small waves-effect waves-light pink accent-2"
//       style={controlStyle}
//       onClick={handleResume}
//     >
//       <i className="material-icons">play_arrow</i>
//     </a>
//     <a
//       className="btn-floating btn-small waves-effect waves-light pink accent-2"
//       onClick={handlePause}
//     >
//       <i className="material-icons">pause</i>
//     </a>
//     <p>
//       <input type="checkbox" id="test5" />
//       <label htmlFor="test5">Retweets</label>
//     </p>
//   </div>
// );
