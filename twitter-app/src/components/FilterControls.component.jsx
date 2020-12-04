function filterControls({ controlStyle, handleResume, handlePause }) {
  return (
    <div>
      <a
        href="#"
        className="btn-floating btn-small waves-effect waves-light pink accent-2"
        style={controlStyle}
        onClick={handleResume}
      >
        <i className="material-icons">play_arrow</i>
      </a>
      <a
        href="#"
        className="btn-floating btn-small waves-effect waves-light pink accent-2"
        onClick={handlePause}
      >
        <i className="material-icons">pause</i>
      </a>
      <p>
        <input type="checkbox" id="test5" />
        <label htmlFor="test5">Retweets</label>
      </p>
    </div>
  );
}

export default filterControls;
