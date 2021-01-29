// import React, { useRef } from 'react';
// import {
//   List,
//   AutoSizer,
//   CellMeasurer,
//   CellMeasurerCache,
// } from 'react-virtualized';
import Card from './Card.jsx';

function ItemsCards({ allTweetIds }) {
  return allTweetIds.map((item, index) => <Card key={index} data={item} />);
}

// function ItemsCards({ allTweetIds }) {
//   const cache = useRef(
//     new CellMeasurerCache({
//       fixedWidth: true,
//       defaultHeight: 100,
//     })
//   );
//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <AutoSizer>
//         {({ width, height }) => (
//           <List
//             width={width}
//             height={height}
//             rowHeight={cache.current.rowHeight}
//             deferredMeasurementCache={cache.current}
//             rowCount={allTweetIds.length}
//             rowRenderer={({ key, index, style, parent }) => {
//               const tweetId = allTweetIds[index];

//               return (
//                 <CellMeasurer
//                   key={key}
//                   cache={cache.current}
//                   parent={parent}
//                   columnIndex={0}
//                   rowIndex={index}
//                 >
//                   <Card data={tweetId} style={style} />
//                 </CellMeasurer>
//               );
//             }}
//           />
//         )}
//       </AutoSizer>
//     </div>
//   );
// }

export default ItemsCards;
