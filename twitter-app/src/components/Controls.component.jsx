import FilterControls from './FilterControls.component.jsx';

function Controls({ allTweetIds, controlStyle, handleResume, handlePause }) {
  return (
    <div>
      {allTweetIds.length > 0 ? (
        <FilterControls
          controlStyle={controlStyle}
          handleResume={handleResume}
          handlePause={handlePause}
        />
      ) : null}
    </div>
  );
}

export default Controls;

// let controls = (
//   <div>
//     {items.length > 0 ? (
//       <FilterControls
//         controlStyle={controlStyle}
//         handleResume={handleResume}
//         handlePause={handlePause}
//       />
//     ) : null}
//   </div>
// );
