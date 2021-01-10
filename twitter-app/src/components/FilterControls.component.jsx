function filterControls({ controlStyle, handleResume, handlePause }) {
  return (
    <div>
      <a
        href="#!"
        className="btn-floating btn-small waves-effect waves-light pink accent-2"
        onClick={handlePause}
      >
        <i className="material-icons">pause</i>
      </a>
    </div>
  );
}

export default filterControls;
