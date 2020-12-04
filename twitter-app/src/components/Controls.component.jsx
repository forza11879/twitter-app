import FilterControls from './FilterControls.component';

function Controls({ items, controlStyle, handleResume, handlePause }) {
  return (
    <div>
      {items.length > 0 ? (
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
