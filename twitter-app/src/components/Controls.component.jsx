import FilterControls from './FilterControls.component.jsx';

function Controls({ allTweetIds, handlePause }) {
  return (
    <div>
      {allTweetIds.length > 0 ? (
        <FilterControls handlePause={handlePause} />
      ) : null}
    </div>
  );
}

export default Controls;
